const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");


//=================================
//            video
//=================================

let storage = multer.diskStorage({

    destination: (req, file, cb) => {cb(null, "uploads/");},
    filename: (req, file, cb) => { cb(null, `${Date.now()}_${file.originalname}`)},
    fileFilter : (req,file,cb)=>{
        const ext = path.extname(file.originalname);
        if(ext !=='.mp4'){
             return cb(res.status(400).end('only mp4 is allowed'),false);
        }
        cb(null,true);
     }
})
    
var upload = multer({storage: storage}).single("file");
    
router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
    if (err) {
       return res.json({ success: false, err })
    }else{
       return res.json({ success: true ,url: res.req.file.path, fileName: res.req.file.filename})    
       }
    })
});

router.post('/uploadVideo', (req, res) => {
    //비디오 정보를 db에 저장.
    const video = new Video(req.body) //클라이언트에서 받은 모든걸 받는것 = body
    video.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })
});

router.post('/thumnail', (req, res) => {

    //썸네일 생성하고 비디오 러닝타임 정보도 얻기

    let filePath="";
    let fileDuration="";

    ffmpeg.ffprobe(req.body.url,function(err,metadata){
        console.dir(metadata); //all metadata
        console.log(metadata.format.duration);
        fileDuration= metadata.format.duration
    })

    ffmpeg(req.body.url)
    .on('filenames',function(filenames){
        console.log('Will generate'+ filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end',function(){
        console.log('Screenshots taken');
        return res.json({success:true, filePath:filePath, fileDuration: fileDuration});
    })
    .on('error',function(err){
        console.log(err);
        return res.json({success:false, err});
    })
    .screenshots({
        count: 1,
        folder: "uploads/thumbnails",
        size:'320x240',
        // %b : input basename (filename w/o extension)
        filename: 'thumbnail-%b.png'
    })

});

router.get('/getVideos', (req, res) => {
    //비디오를 db에서 가져와서 클라이언트에 보내기.
    //find를 통해 모든 video 데이터를 가져옴
    Video.find()
        .populate('writer')
        .exec((err,videos)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, videos})
        })
    
});

router.post('/getVideoDetail', (req, res) => {
    //클라이언트에서 비디오 id를 보내줌
    Video.findOne({ "_id": req.body.videoId})
        .populate('writer')
        .exec((err,videoDetail)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true,videoDetail})
        })
});

module.exports =router;