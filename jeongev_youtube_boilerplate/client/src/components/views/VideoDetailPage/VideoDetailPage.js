import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios';
import SideVideos from './Sections/SideVideo'
import Subscriber from './Sections/Subscriber'
import Comment from './Sections/Comment'


function VideoDetailPage(props) {
    const VideoId = props.match.params.videoId;
    let variable = {videoId : VideoId}
    
    const [VideoDetail, setVideoDetail]= useState([])
    //const [Comment, setComment]= useState("")

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
    },[]);

    if(VideoDetail.writer){
        const subscribeButton = VideoDetail.writer._id !==localStorage.getItem('userId') && <Subscriber userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
                <div style={{width:'100%', padding:'3rem 4rem'}}>
                    <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                        <List.Item actions ={[subscribeButton]} 
                        >
                            <List.Item.Meta 
                                avater ={<Avatar src={VideoDetail.writer.image} />}
                                title = {VideoDetail.writer.name}
                                description ={VideoDetail.discription}
                            />
                        </List.Item>

                        <Comment postId={VideoId} />
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
