const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mkdirp = require('mkdirp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

const DATA_DIR = path.join(__dirname,'data');
const DB_FILE = path.join(DATA_DIR,'db.json');
const UPLOADS = path.join(__dirname,'uploads');
mkdirp.sync(DATA_DIR);
mkdirp.sync(UPLOADS);

// Initialize DB if missing
if(!fs.existsSync(DB_FILE)){
  fs.writeFileSync(DB_FILE, JSON.stringify({notes:[],images:[],lines:[]},null,2));
}

function readDB(){ try{ return JSON.parse(fs.readFileSync(DB_FILE,'utf8')); }catch(e){ return {notes:[],images:[],lines:[]}; } }
function writeDB(obj){ fs.writeFileSync(DB_FILE, JSON.stringify(obj,null,2)); }

// Serve frontend static files if present
const FRONTEND = path.join(__dirname,'..','frontend');
if(fs.existsSync(FRONTEND)){
  app.use(express.static(FRONTEND));
  console.log('Serving frontend from', FRONTEND);
}

// Serve uploads
app.use('/uploads', express.static(UPLOADS));

// Simple board endpoints
app.get('/api/board', (req,res)=>{
  const db = readDB();
  res.json(db);
});

app.post('/api/board', (req,res)=>{
  const payload = req.body;
  if(!payload) return res.status(400).send('missing payload');
  writeDB(payload);
  res.json({ok:true});
});

// Image upload
const storage = multer.diskStorage({ destination: function(req,file,cb){ cb(null, UPLOADS); }, filename: function(req,file,cb){ const name = Date.now()+"-"+file.originalname.replace(/[^a-zA-Z0-9.\-_]/g,'_'); cb(null, name); } });
const upload = multer({storage});
app.post('/api/upload', upload.single('file'), (req,res)=>{
  if(!req.file) return res.status(400).json({error:'no file'});
  const url = '/uploads/' + req.file.filename;
  // Optionally record in DB
  const db = readDB();
  db.images = db.images || [];
  db.images.push({id: 'i_'+Date.now(), url, x:120, y:120, w:200, h:140});
  writeDB(db);
  res.json({url});
});

app.listen(PORT, ()=>{ console.log('Server listening on', PORT); });
