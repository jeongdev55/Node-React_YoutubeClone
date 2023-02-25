import React ,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Typography, Button, Form, message, Input,Icon} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';

Axios.default.timeout = 5 * 1000;

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


function VideoUploadPage(props) {
  const user = useSelector(state=>state.user);
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0) //private =0 public =1
  const [Category, setCategory] = useState("Film & Animation")
  const [FilePath, setFilePath]=useState("")
  const [Duration, setDuration]=useState("")
  const [ThumbnailPath, setThumbnailPath]=useState("")

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
              
              let variable ={
                url:response.data.url,
                fileName:response.data.fileName
              }

              setFilePath(response.data.url)
              console.log("variable :"+variable)

              Axios.post('/api/video/thumnail',variable)
                .then(response=>{
                  if(response.data.success){
                    console.log(response.data)
                    setDuration(response.data.fileDuration)
                    setThumbnailPath(response.data.filePath)
                    console.log(Duration);
                    console.log(ThumbnailPath);
                  }else{
                    alert('썸네일 생성에 실패했습니다.')
                  }
                })
            }else{
              alert("비디오 업로드를 실패했습니다.")
            }
          })
  }

  const onSumit =(e)=>{  
    e.preventDefault(); //원래 클릭 이벤트를 방지하고 하고싶은 것을 실행하기 위해서 

    const variable={
      writer: user.userData._id,
      title: VideoTitle,
      discription: Description,
      privacy: Private,
      filePath: FilePath,
      catagory: Category,
      duration: Duration,
      thumbnail:ThumbnailPath 
    }
    Axios.post('/api/video/uploadVideo',variable)
        .then(response=>{
          if(response.data.success){
            message.success("성공적으로 업로드 했습니다.")

            setTimeout(()=>{
              props.history.push('/');
            },3000)
            
          }else{
            alert("비디오 업로드에 실패했습니다.")
          }
        })
  }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style ={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSumit}>
        <div style={{ display:'flex', justifyContent:'space-between'}}>
             {/* Drop zone*/}
             <Dropzone 
             onDrop ={onDrop} //파일을 드롭할 경우 처리할 함수
             multiple ={false} //파일을 여러개? 하나일경우 false
             maxSize={10000000000} //파일 사이즈 지정
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
            {ThumbnailPath &&
            <div>
              <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
            </div>
            }
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
        <Button type="primary" size="large" onClick={onSumit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
