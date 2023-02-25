const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId, //스키마를 사용해서 타입을 정의하면
        ref:'User'  //User.js 에 있는 유저 정보를 모두 불러올 수 있음.
    },
    title: {
        type:String,
        minglength: 50
    },
    discription: {
        type:String
    },
    privacy:{
        type: Number
    },
    filePath:{
        type:String
    },
    catagory:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
},{timestamps:true}) //만든날과 업데이트한 날이 표시되도록.

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }