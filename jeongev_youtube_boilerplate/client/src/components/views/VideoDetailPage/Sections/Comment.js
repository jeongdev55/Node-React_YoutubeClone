import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios';
import SingleComment from './SingleComment'

function Comment(props) {

    const videoId = props.videoId
    const user = useSelector(state => state.user); //userData
    const [CommentValue,setCommentValue] = useState("")

    const handleClick =(event)=>{
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit =(event)=>{
        event.preventDefault();

        const variables ={
            content : CommentValue,
            writer : user.userData._id,
            videoId : videoId
        }
        Axios.post('/api/comment/saveComment',variables)
                .then(response =>{
                    if(response.data.success){
                        console.log(response.data.result)
                    }else{
                        alert("커멘트를 저장하지 못했습니다.")
                    }
                })
    }
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentList && props.commentList.map((comment,index)=>(
        <SingleComment comment={comment} videoId={videoId}/>
      ))}
      


      {/* Root Comment Form */}

      <form style={{display:'flex'}}>
        <textarea style={{width:'100%', borderRadius:'5px'}}
                    onChange ={handleClick}
                    value ={CommentValue}
                    placeholder="코멘트를 작성해주세요" />
        <br />
        <button style={{width :'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
      </form>
    </div>
  )
}

export default Comment
