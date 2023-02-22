const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("../../node_modules/multer");
const path = require('path');

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
    
    console.log(file.type);
     // mime type 체크하여 원하는 타입만 필터링
     if (file.type == 'video/mp4' || file.type == 'image/jpeg') {
         cb(null, true);
     } else {
         cb({msg: 'mp4과 png 파일만 업로드 가능합니다.'}, false);
     }
     }


const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")


router.post('/uploadfiles',(req,res)=>{

    upload(req,res,err=>{
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success:true,url:res.req.file.path , fileName : res.req.file.filename})
    })
    //req 클라이언트에서 보내온 파일. 저장


})

module.exports =router;