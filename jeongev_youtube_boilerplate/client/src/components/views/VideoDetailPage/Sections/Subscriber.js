import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Subscriber(props) {

    const [SubscribeNumber,setSubscribeNumber] = useState(0);
    const [Subscribed,setSubscribed] = useState(false);


    useEffect(()=>{
        let variable={userTo : props.userTo}
        Axios.post('/api/subscribe/subscriberNumber',variable)
            .then(response =>{
                if(response.data.success){
                    console.log(response.data.subscriberNumber)
                    setSubscribeNumber(response.data.subscriberNumber)
                }else{
                   alert("구독자 수 정보를 받아오지 못했습니다.") 
                }
            })

        let subscribeVariable = {userTo : props.userTo,userFrom:localStorage.getItem('userId')}
        Axios.post('/api/subscribe/subscribed',subscribeVariable)
            .then(response =>{
                if(response.data.success){
                    console.log(response.data.subscribed)
                    setSubscribed(response.data.subscribed)
                }else{
                    alert("정보를 가져받아오지 못했습니다...")
                }
            })

    },[]);
    
    const onSubscribe = ()=>{

        let subscribeVariable ={
            userTo :props.userTo,
            userFrom :props.userFrom
        }
        //이미 구독중이라면
        if(Subscribed){

            Axios.post('/api/subscribe/unSubscribe',subscribeVariable)
                .then(response=>{
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber -1)
                        setSubscribed(!Subscribed)
                    }else{
                        alert("구독 취소하는데 실패했습니다.")
                    }
                })
        //아직 구독중이 아니라면
        }else{

            Axios.post('/api/subscribe/subscribe',subscribeVariable)
            .then(response=>{
                if(response.data.success){
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert("구독 하는데 실패했습니다.")
                }
            })
        }
    }

    return (

        <div
    
          style={{
            backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
            borderRadius: "4px",
            color: "white",
            padding: "10px 16px",
            fontWeight: "500",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
          onClick={onSubscribe}
        >
          {Subscribed ? `${SubscribeNumber}  Subscribed` : `${SubscribeNumber}  Subscribe`}
        </div>
      );
    }  
    
export default Subscriber;