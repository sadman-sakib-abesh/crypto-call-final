import {useRef,useEffect,useState} from 'react'
const Input =(props)=>{
        const videoRef = useRef(null);
        const audioRef=useRef(null)
        
        const [audio,setAudio]=useState(false)
        const [video,setVideo]=useState(false)
        const [share,setShare]=useState(false)
        const[tracks,setTrack]=useState('')
        const[atracks,setAtrack]=useState('')
        

useEffect(()=>{
    props.audioObj(audioRef)
  props.videoObj(videoRef)
  
})
        
    
const play=()=>{

    navigator.mediaDevices
    .getUserMedia({video:{ facingMode: `${props.videoFace}`},audio:false})
    .then(stream => {
        let vid = videoRef.current;
      vid.srcObject = stream;
setTrack(vid.srcObject.getTracks())

       vid.play()
    }).catch(err=>{
console.log(err)
    })
    
}
const splay=()=>{

    navigator.mediaDevices.getDisplayMedia({video:true,audio:false})
    .then(stream => {

        let vid = videoRef.current;
      vid.srcObject = stream;


       vid.play()
    }).catch(err=>{
console.log(err)
    })
    
}
const Aplay=()=>{

    navigator.mediaDevices
    .getUserMedia({video:false,audio:true})
    .then(stream => {
        let aud = audioRef.current;
      aud.srcObject = stream;
setAtrack(aud.srcObject.getTracks())

       aud.play()
    }).catch(err=>{
console.log(err)
    })
    
}




const stop=()=>{
    tracks.forEach((track)=> {
        track.stop();
      });
}


const Astop=()=>{
    atracks.forEach((track)=> {
        track.stop();
      });
}


          return (
            <div id={props.id}>
        {video?<i class='fas fa-video' id={props.videoId} onClick={()=>{stop();setVideo(false)}}></i>:<i class='fas fa-video-slash' id={props.videoSlashId} onClick={()=>{play();setVideo(true)}}></i>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {audio?<i class='fas fa-microphone'  id={props.audioId} onClick={()=>{Astop();setAudio(false)}}></i>:<i class='fas fa-microphone-slash'  id={props.audioSlashId} onClick={()=>{Aplay();setAudio(true)}}></i>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class='fas fa-arrow-alt-circle-up'   id={props.screenId} onClick={()=>{splay();setShare(true)}}></i>
               
              </div>
          )
    
}

export default Input;