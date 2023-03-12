const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DislikeSchema = mongoose.Schema({
    userId: {
        type:Schema.Types.ObjectId, 
        ref:'User'  
    },
    commentId: {
        type:Schema.Types.ObjectId, 
        ref:'Comment'  
    },
    videoId: {
        type:Schema.Types.ObjectId, 
        ref:'Video'  
    }

},{timestamps:true}) //만든날과 업데이트한 날이 표시되도록.

const Dislike = mongoose.model('Dislike', DislikeSchema);

module.exports = { Dislike }