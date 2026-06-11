// Minimal scrapboard MVP: notes, images, draggable, lines, themes. Persists to backend or localStorage.
const board = document.getElementById('board');
const linesLayer = document.getElementById('linesLayer');
const addNoteBtn = document.getElementById('addNote');
const imageInput = document.getElementById('imageInput');
const toggleLineBtn = document.getElementById('toggleLine');
const themeSelect = document.getElementById('themeSelect');
const clearBtn = document.getElementById('clear');

let state = {notes:[],images:[],lines:[]};
let drawMode = false; let lineFrom = null;
let lastDeleted = null; // {type, item, timeoutId}
let currentDrag = null; // track active drag across elements


async function save(){
  try{
    await fetch('/api/board',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});
  }catch(e){
    localStorage.setItem('scrapboard.v1',JSON.stringify(state));
  }
  render();
}
async function load(){
  try{
    const res=await fetch('/api/board');
    if(res.ok){ state = await res.json(); }
    else { const raw=localStorage.getItem('scrapboard.v1'); if(raw) state=JSON.parse(raw); }
  }catch(e){ const raw=localStorage.getItem('scrapboard.v1'); if(raw) state=JSON.parse(raw); }
}

function uid(prefix='id'){return prefix+Math.random().toString(36).slice(2,9)}

function createNote(x=80,y=80,theme='yellow',text='New note'){const rot = (Math.random()*12)-6; const n={id:uid('n_'),x,y,w:180,h:120,theme,content:text,rot};state.notes.push(n);save();}

function createImage(dataUrl,x=100,y=100,w=200,h=140){const img={id:uid('i_'),x,y,w,h,url:dataUrl,rot:0};state.images.push(img);save();}

function createLine(fromId,toId,style='solid',color='#111'){if(fromId===toId) return; state.lines.push({id:uid('l_'),from:fromId,to:toId,style,color}); save();}

function clearBoard(){if(confirm('Clear board? This removes all items.')){state={notes:[],images:[],lines:[]};save();}}

function render(){board.innerHTML=''; renderImages(); renderNotes(); renderLines();}

function renderNotes(){
  state.notes.forEach(n=>{
    const el=document.createElement('div'); el.className='note theme-'+n.theme; el.style.left=n.x+'px'; el.style.top=n.y+'px'; el.style.width=n.w+'px'; el.style.height=n.h+'px'; el.dataset.id=n.id; el.style.transform = `rotate(${n.rot||0}deg)`;
    const content=document.createElement('div'); content.className='content'; content.contentEditable=true; content.innerText=n.content;
    content.addEventListener('input',()=>{n.content=content.innerText; save();});

    const del=document.createElement('button'); del.className='delete-btn'; del.title='Delete note'; del.innerText='✕';
    del.addEventListener('click',ev=>{ev.stopPropagation(); deleteNoteWithUndo(n.id);});

    el.appendChild(del);
    el.appendChild(content);
    board.appendChild(el);
    makeDraggable(el,n);
    el.addEventListener('click',ev=>{ if(drawMode){ ev.stopPropagation(); if(!lineFrom){ lineFrom=n.id; el.classList.add('selected'); } else { createLine(lineFrom,n.id); document.querySelectorAll('.note.selected').forEach(x=>x.classList.remove('selected')); lineFrom=null; } }});
  });
}

function renderImages(){
  state.images.forEach(img=>{
    const wrap=document.createElement('div'); wrap.className='image-wrap'; wrap.style.left=img.x+'px'; wrap.style.top=img.y+'px'; wrap.style.width=img.w+'px'; wrap.style.height=img.h+'px'; wrap.dataset.id=img.id; wrap.style.position='absolute';

    const el=document.createElement('img'); el.className='board-image'; el.src=img.url; el.style.width='100%'; el.style.height='100%'; el.style.transform = `rotate(${img.rot||0}deg)`;

    const overlay=document.createElement('div'); overlay.className='img-overlay';
    const del=document.createElement('button'); del.className='delete-btn'; del.title='Delete image'; del.innerText='✕'; del.addEventListener('click',ev=>{ev.stopPropagation(); deleteImageWithUndo(img.id);});
    overlay.appendChild(del);

    // resize handle
    const resize=document.createElement('div'); resize.className='resize-handle';
    // rotate handle
    const rotate=document.createElement('div'); rotate.className='rotate-handle';

    wrap.appendChild(el);
    wrap.appendChild(overlay);
    wrap.appendChild(resize);
    wrap.appendChild(rotate);

    board.appendChild(wrap);

    makeDraggable(wrap,img,true);

    // resize
    resize.addEventListener('pointerdown', e => {
      e.stopPropagation();
      let lastX = e.clientX, lastY = e.clientY;
      const onMove = ev => {
        const dx = ev.clientX - lastX; const dy = ev.clientY - lastY;
        lastX = ev.clientX; lastY = ev.clientY;
        img.w = Math.max(40, img.w + dx); img.h = Math.max(40, img.h + dy);
        wrap.style.width = img.w + 'px'; wrap.style.height = img.h + 'px';
        renderLines();
      };
      const onUp = ev => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        try{ resize.releasePointerCapture(ev.pointerId); }catch{}
        save();
      };
      resize.setPointerCapture(e.pointerId);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });

    // rotate
    rotate.addEventListener('pointerdown', e => {
      e.stopPropagation();
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
      const onMove = ev => { const ang = Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180 / Math.PI; img.rot = ang; el.style.transform = `rotate(${img.rot}deg)`; renderLines(); };
      const onUp = ev => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); try{ rotate.releasePointerCapture(ev.pointerId);}catch{} save(); };
      rotate.setPointerCapture(e.pointerId);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });

    // draw-line click
    wrap.addEventListener('click',ev=>{ if(drawMode){ ev.stopPropagation(); if(!lineFrom){ lineFrom=img.id; wrap.classList.add('selected'); } else { createLine(lineFrom,img.id); document.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected')); lineFrom=null; } }});
  });
}

function renderLines(){ // draw SVG lines between centers
  // allow pointer events on lines
  linesLayer.innerHTML='';
  state.lines.forEach(l=>{
    const a = findElementById(l.from);
    const b = findElementById(l.to);
    if(!a||!b) return;
    const x1=a.x + (a.w||a.width||100)/2; const y1=a.y + (a.h||a.height||60)/2;
    const x2=b.x + (b.w||b.width||100)/2; const y2=b.y + (b.h||b.height||60)/2;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',x1); line.setAttribute('y1',y1); line.setAttribute('x2',x2); line.setAttribute('y2',y2);
    line.setAttribute('stroke',l.color||'#111'); line.setAttribute('stroke-width','3'); line.setAttribute('stroke-linecap','round');
    if((l.style||'solid') === 'dashed') line.setAttribute('stroke-dasharray','8 6');
    line.dataset.id = l.id;
    line.style.cursor = 'pointer';
    line.setAttribute('pointer-events','auto');
    line.addEventListener('click',ev=>{ ev.stopPropagation(); deleteLineWithUndo(l.id); });
    linesLayer.appendChild(line);
  });
}

function findElementById(id){ const n = state.notes.find(x=>x.id===id); if(n) return n; const i = state.images.find(x=>x.id===id); if(i) return i; return null; }

function makeDraggable(el,obj,isImage){
  el.addEventListener('pointerdown',e=>{
    if(e.target.classList.contains('resize-handle')||e.target.classList.contains('rotate-handle')||e.target.classList.contains('delete-btn')|| e.target.classList.contains('content') || e.target.isContentEditable) return;
    e.preventDefault();
    const pid = e.pointerId;
    currentDrag = {el,obj,isImage,lastX:e.clientX,lastY:e.clientY,pointerId:pid};
    try{ el.setPointerCapture(pid); }catch{}
    el.style.zIndex = 1000;
  });
}

// Global handlers for drag to avoid accumulating event listeners
window.addEventListener('pointermove', e=>{
  if(!currentDrag) return;
  const dx = e.clientX - currentDrag.lastX;
  const dy = e.clientY - currentDrag.lastY;
  currentDrag.lastX = e.clientX; currentDrag.lastY = e.clientY;
  currentDrag.obj.x += dx; currentDrag.obj.y += dy;
  currentDrag.el.style.left = currentDrag.obj.x + 'px';
  currentDrag.el.style.top = currentDrag.obj.y + 'px';
  renderLines();
});
window.addEventListener('pointerup', e=>{
  if(!currentDrag) return;
  try{ currentDrag.el.releasePointerCapture(currentDrag.pointerId); }catch{}
  currentDrag.el.style.zIndex = '';
  save();
  currentDrag = null;
});

// Deletion with undo
function deleteNoteWithUndo(id){ const idx = state.notes.findIndex(n=>n.id===id); if(idx===-1) return; const item = state.notes.splice(idx,1)[0]; save(); scheduleUndo({type:'note', item});}
function deleteImageWithUndo(id){ const idx = state.images.findIndex(i=>i.id===id); if(idx===-1) return; const item = state.images.splice(idx,1)[0]; save(); scheduleUndo({type:'image', item});}
function deleteLineWithUndo(id){ const idx = state.lines.findIndex(l=>l.id===id); if(idx===-1) return; const item = state.lines.splice(idx,1)[0]; save(); scheduleUndo({type:'line', item});}

function scheduleUndo(payload){ // payload: {type, item}
  // clear previous
  if(lastDeleted && lastDeleted.timeoutId) clearTimeout(lastDeleted.timeoutId);
  lastDeleted = {payload, timeoutId: setTimeout(()=>{ lastDeleted=null; removeUndoToast(); },30000)};
  showUndoToast(payload.type);
}

function showUndoToast(type){ removeUndoToast(); const t = document.createElement('div'); t.id='undoToast'; t.className='undo-toast'; t.innerHTML = `<span>Deleted ${type}</span>`;
  const btn = document.createElement('button'); btn.innerText='Undo'; btn.addEventListener('click',()=>{ if(!lastDeleted) return; const p = lastDeleted.payload; clearTimeout(lastDeleted.timeoutId); lastDeleted=null; removeUndoToast(); if(p.type==='note'){ state.notes.push(p.item); } else if(p.type==='image'){ state.images.push(p.item); } else if(p.type==='line'){ state.lines.push(p.item); } save(); });
  t.appendChild(btn); document.body.appendChild(t);
}
function removeUndoToast(){ const ex = document.getElementById('undoToast'); if(ex) ex.remove(); }

addNoteBtn.addEventListener('click',()=>{createNote(80,80,themeSelect.value,'New note');});
imageInput.addEventListener('change',async e=>{const f=e.target.files[0]; if(!f) return; try{ const fd=new FormData(); fd.append('file',f); const res=await fetch('/api/upload',{method:'POST',body:fd}); if(res.ok){ const data=await res.json(); createImage(data.url,120,120,200,140); } else { const reader=new FileReader(); reader.onload=ev=>{createImage(ev.target.result,120,120,200,140);}; reader.readAsDataURL(f); } }catch(err){ const reader=new FileReader(); reader.onload=ev=>{createImage(ev.target.result,120,120,200,140);}; reader.readAsDataURL(f); }});

toggleLineBtn.addEventListener('click',()=>{drawMode=!drawMode; toggleLineBtn.textContent = drawMode? 'Exit Draw' : 'Draw Line'; if(!drawMode){ lineFrom=null; document.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected')); }});

themeSelect.addEventListener('change',()=>{/* theme choice applies to new notes only */});
clearBtn.addEventListener('click',clearBoard);

board.addEventListener('click',()=>{ if(drawMode && lineFrom){ document.querySelectorAll('.selected').forEach(x=>x.classList.remove('selected')); lineFrom=null; }});

// Init
load().then(()=>{ render(); syncSvg(); }).catch(()=>{ render(); syncSvg(); });

// Resize svg to match board size
function syncSvg(){linesLayer.setAttribute('width',board.clientWidth); linesLayer.setAttribute('height',board.clientHeight); linesLayer.style.width=board.clientWidth+'px'; linesLayer.style.height=board.clientHeight+'px'; }
window.addEventListener('resize',()=>{syncSvg(); render();}); syncSvg();
