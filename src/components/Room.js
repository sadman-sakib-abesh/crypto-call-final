import React, { useEffect,useRef,useState } from 'react';
import Peer from 'peerjs'

import CopyToClipboard from'react-copy-to-clipboard'

import io from 'socket.io-client'
const Room =()=>{
  const [mediaStream,setStream]=useState('')
 
const [audio,setAudio]=useState(true)
const [video,setVideo]=useState(true)
const [user,setUser]=useState('')
const videoRef=useRef(null)
const selfRef=useRef(null)
const[id,setId]=useState('')


//peer-serv.glitch.me

var peer = new Peer({
  secure:true,
  host: "mailer14.herokuapp.com/",
  port: 443,
  path: "/peerjs",
  iceServers: [
    {
      urls: "stun:openrelay.metered.ca:80",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ]
});


  

useEffect(()=>{
 
  peer.on('open', function(id) {
    setId(id);
  });
  peer.on('call', function(call) {
    
  

    navigator.mediaDevices
    .getUserMedia({video:true,audio:true})
    .then(stream => {
      let self=selfRef.current
      self.srcObject=stream
      self.play()
      setStream(stream)
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        let vid=videoRef.current
    vid.srcObject=remoteStream
        vid.play()    
      })
    
    
    
    
    }).catch(err=>{
    console.log(err)
    })
    })
  
  },[])


const play=()=>{
  mediaStream.getVideoTracks().forEach(element => {
    element.enabled=true
  });
}

const stop=()=>{
  mediaStream.getVideoTracks().forEach(element => {
    element.enabled=false
  });
}
const Aplay=()=>{
  mediaStream.getAudioTracks().forEach(element => {
    element.enabled=true
  });
}

const Astop=()=>{
  mediaStream.getAudioTracks().forEach(element => {
    element.enabled=false
  });
}


const call=()=>{
  
    navigator.mediaDevices
  .getUserMedia({video:true,audio:true})
  .then(stream => {
    setStream(stream)
    let self=selfRef.current
    self.srcObject=stream
    self.play()
    var call = peer.call(user, stream);
  call.on('stream', function(remoteStream) {

var vid=videoRef.current
vid.srcObject=remoteStream
vid.play()
  })
}).catch(err=>{
  console.log(err)
  })
  




}

const share=()=>{

  
  navigator.mediaDevices
.getDisplayMedia({video:true,audio:true})
.then(stream => {
  setStream(stream)
  let self=selfRef.current
  self.srcObject=stream
  self.play()
  var call = peer.call(user, stream);
call.on('stream', function(remoteStream) {

var vid=videoRef.current
vid.srcObject=remoteStream
vid.play()
})
}).catch(err=>{
console.log(err)
})





}




  return(
<div>
  
  <br/><br/><br/>
  <center>
    <div id='copy'>
  <CopyToClipboard text={id} onCopy={()=>alert('copied')}>
 <span> {id} &nbsp;&nbsp;<i class="fa fa-clone"></i> </span>
        </CopyToClipboard>
        </div>
  <br/>
 <br/>
<input id='in' type='text' placeholder="dial friend's id" onChange={(e)=>setUser(e.target.value)}/><br/><br></br>

 <br/>
<video id='video-out' ref={selfRef} muted></video><br/>
 <video id='video' ref={videoRef} ></video>
 <br/>
 <div id='fixed'><span id='i-2'>{video?<i class='fa fa-video-camera' id='call' onClick={()=>{stop();setVideo(false)}}></i>:<i class='fa fa-video-camera fa-2x' id='call' onClick={()=>{play();setVideo(true)}}/>}
      </span>
  <span id='i-2'>{audio?<i class='fa fa-microphone'  id='call' onClick={()=>{Astop();setAudio(false)}}></i>:<i class='fa fa-microphone-slash'  id='call' onClick={()=>{Aplay();setAudio(true)}}></i>}</span>
  <span id='i-3'><i class='fa fa-arrow-up'   id='call' onClick={()=>{share()}}></i> </span>
 
<span id='i-1'><i id='call' class='fa fa-phone' onClick={()=>call()}/></span>
</div>
  
</center>

</div>
  )
    
  
}

export default Room;
