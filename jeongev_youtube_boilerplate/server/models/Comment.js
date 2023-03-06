const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId, 
        ref:'User'  
    },
    postId: {
        type:Schema.Types.ObjectId,
        ref:'Video' 
    },
    responseTo: {
        type:Schema.Types.ObjectId,
        ref:'User' 
    },
    content: {
        type:String
    }
},{timestamps:true}) //만든날과 업데이트한 날이 표시되도록.

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }