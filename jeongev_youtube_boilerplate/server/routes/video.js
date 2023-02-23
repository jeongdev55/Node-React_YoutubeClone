const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");



//=================================
//             User
//=================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    
     cb(null, 'uploads/')
    
     },
    
    filename: (req, file, cb) => {
    
     cb(null, `${Date.now()}_${file.originalname}`)
    
     }
    
    })
    
    
    const fileFilter = (req, file, cb) => {
    
     // mime type 체크하여 원하는 타입만 필터링
    console.log(file.mimetype);
     if (file.mimetype == 'video/mp4' ) {
    
     cb(null, true);
    
     } else {
    
     cb({msg:'mp4 파일만 업로드 가능합니다.'}, false);
    
     }
    
    
    
    }
    
    
    
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")
    
    
    
    //=================================
    
    // Video
    
    //=================================
    
    router.post("/uploadfiles", (req, res) => {
    console.log(req.file);
     upload(req, res, err => {
    
     if (err) {
    
     return res.json({ success: false, err })
    
     }
    
     else{
    
     return res.json({ success: true ,filePath: res.req.file.path, fileName: res.req.file.filename})
     
    
     }
    
     })
    
    });
module.exports =router;