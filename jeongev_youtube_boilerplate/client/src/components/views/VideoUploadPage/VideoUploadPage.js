import React ,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOptions =[
  {value :0,label :"Private"},
  {value :1,label :"Public"}
]


const CategoryOptions =[
  {value :0,label :"Film & Animation"},
  {value :1,label :"Autos & Vehicles"},
  {value :2,label :"Music"},
  {value :3,label :"Pets & Animals"},
  {value :4,label :"Sports"}
]


function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0) //private =0 public =1
  const [Category, setCategory] = useState("Film & Animation")


  const onDescriptionChange=(e)=>{
    setDescription(e.currentTarget.value)
  }
  const onTitleChange=(e)=>{
    setVideoTitle(e.currentTarget.value)
  }
  
  const onPrivateChange=(e)=>{
    setPrivate(e.currentTarget.value)
  }
  
  const onCategoryChange=(e)=>{
    setCategory(e.currentTarget.value)
  }

  const onDrop = (files)=>{
    let formData = new FormData;

    //파일을 서버에 보낼경우 에러없이 보내기위해 타입 넣어줌
    const config= {
      header :{'conten-type' : 'multipart/form-data'}
    }

    formData.append("file",files[0])

    console.log(files[0]);

    Axios.post('/api/video/uploadfiles',formData,config)
          .then(response =>{
            if(response.data.success){
              console.log(response.data)
            }else{
              alert("비디오 업로드를 실패했습니다.")
            }
          })
  }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style ={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display:'flex', justifyContent:'space-between'}}>
             {/* Drop zone*/}
             <Dropzone 
             onDrop ={onDrop} //파일을 드롭할 경우 처리할 함수
             multiple ={false} //파일을 여러개? 하나일경우 false
             maxSize={1000000} //파일 사이즈 지정
             > 
             {({getRootProps,getInputProps})=>(
               <div style={{width:'300px',height:'240px',border:'1px solid lightgray',display:'flex',
              alignItems:'center',justifyContent:'center'}}{...getRootProps()} >
              <input {...getInputProps()} />
              <Icon type="plus" style={{fontSize:'3rem' }}/>
              </div>
             )}
            </Dropzone>

             {/* Thumbnail*/}
             <div>
               <img src alt />
             </div>
        </div>
        <br/>
        <br/>
        <label>Title</label>
        <Input
          onChange ={onTitleChange}
          value ={VideoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange ={onDescriptionChange}
          value={Description}
        />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item,index)=>(
             <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item,index)=>(
             <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
