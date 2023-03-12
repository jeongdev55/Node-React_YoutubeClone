import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios';
import SideVideos from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'
import Comment from './Sections/Comment'
import LikeDislikes from './Sections/LikeDislikes'


function VideoDetailPage(props) {
    const VideoId = props.match.params.videoId;
    let variable = {videoId : VideoId}
    
    const [VideoDetail, setVideoDetail]= useState([])
    const [Comments, setComments]= useState([])

    useEffect(()=>{
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                }else{
                    alert("비디오 정보를 가져오길 실패했습니다.");
                }
            })

        Axios.post('/api/comment/getComments',variable)
            .then(response =>{
                if(response.data.success){
                    console.log(response.data.comments)
                    setComments(response.data.comments)
                }else{
                    alert("코멘트 정보를 가져오지 못했습니다.");
                }
            })
    },[]);

    const refreshFunction =(newComment)=>{
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !==localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row guttver={[16,16]}>
            <Col lg={18} xs={24}>
                <div style={{width:'100%', padding:'3rem 4rem'}}>
                    <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                        <List.Item actions ={[<LikeDislikes  video  userId={localStorage.getItem('userId')} videoId={VideoId} />,subscribeButton]} 
                        >
                            <List.Item.Meta 
                                avatar={ <Avatar src={VideoDetail.writer.image }  /> }
                                title = {VideoDetail.writer.name}
                                description ={VideoDetail.discription}
                            />
                        </List.Item>

                        <Comment refreshFunction={refreshFunction} commentList={Comments} videoId={VideoId} />
                </div>
        
            </Col>
            <Col lg={6} xs={24}>
                <SideVideos />
            </Col>
            </Row>
            
          )
    }else{
        return (
            <div>...loading</div>
        )
    }
  
}

export default VideoDetailPage
