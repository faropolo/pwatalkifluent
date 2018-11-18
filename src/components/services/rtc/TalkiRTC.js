
function TalkiRTC(signalling, channel, fluentName, talkiName, localVideo, remoteVideo, iceServers) {

    const mediaConstraints = {
        audio: true, 
        video: true 
    };

    let talkiPC
        
    signalling.subscribe({ channels: [ channel ], withPresence: true });

    const createPeerConnection = () => {
        talkiPC = new RTCPeerConnection({iceServers})

        talkiPC.onicecandidate = handleICECandidateEvent;
        talkiPC.ontrack = handleTrackEvent;
        talkiPC.onnegotiationneeded = handleNegotiationNeededEvent;
        talkiPC.onremovetrack = handleRemoveTrackEvent;
        talkiPC.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
        talkiPC.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
        talkiPC.onsignalingstatechange = handleSignalingStateChangeEvent;
    }

    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            sendToServer({
              type: "new-ice-candidate",
              target: talkiName,
              candidate: event.candidate
            });
          }
    }

    const handleTrackEvent = (event) => {
        console.log(event, '<====== ontrack')
        if (remoteVideo.current.srcObject) return
        remoteVideo.current.srcObject = event.streams[0];
    }

    const handleNegotiationNeededEvent = () => {
        talkiPC.createOffer().then(function(offer) {
            talkiPC.setLocalDescription(offer).then( ()=>{
                sendToServer({
                    name: fluentName,
                    target: talkiName,
                    type: "video-offer",
                    sdp: talkiPC.localDescription
                });
            })
        }).catch(reportError);
    }

    const handleRemoveTrackEvent = (event) => {
        var stream = remoteVideo.current.srcObject;
        var trackList = stream.getTracks();
       
        if (trackList.length === 0) {
            closeVideoCall();
        }
    }

    const handleICEConnectionStateChangeEvent = (event) => {
        switch(talkiPC.iceConnectionState) {
            case "closed":
            case "failed":
            case "disconnected":
                closeVideoCall();
                break
            default:
                return 
        }
    }

    const handleICEGatheringStateChangeEvent = () => {

    }

    const handleSignalingStateChangeEvent = (event) => {
        switch(talkiPC.signalingState) {
            case "closed":
                closeVideoCall();
                break;
            default:
                return
        }    
    }
    
    const hangUpCall = () => {
        closeVideoCall();

        sendToServer({
            name: fluentName,
            target: talkiName,
            type: "hang-up"
        });
    }

    const closeVideoCall = () => {
        if (talkiPC) {
            talkiPC.ontrack = null;
            talkiPC.onremovetrack = null;
            talkiPC.onremovestream = null;
            talkiPC.onnicecandidate = null;
            talkiPC.oniceconnectionstatechange = null;
            talkiPC.onsignalingstatechange = null;
            talkiPC.onicegatheringstatechange = null;
            talkiPC.onnotificationneeded = null;
        
            if (remoteVideo.current.srcObject) {
                remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
            }
        
            if (localVideo.current.srcObject) {
                localVideo.current.srcObject.getTracks().forEach(track => track.stop());
            }
        
            talkiPC.close();
            talkiPC = null;
        }
      
        // remoteVideo.removeAttribute("src");
        // remoteVideo.removeAttribute("srcObject");
        // localVideo.removeAttribute("src");
        // localVideo.removeAttribute("srcObject");
      
        // document.getElementById("hangup-button").disabled = true;
    }

    const reportError = (err) => {
        console.log(err)
    }

    const handleGetUserMediaError = (e) => {
        switch(e.name) {
          case "NotFoundError":
            alert("Unable to open your call because no camera and/or microphone" +
                  "were found.");
            break;
          case "SecurityError":
          case "PermissionDeniedError":
            // Do nothing; this is the same as the user canceling the call.
            break;
          default:
            alert("Error opening your camera and/or microphone: " + e.message);
            break;
        }
      
        closeVideoCall();
    }

    const doCall = () => {
        createPeerConnection();

        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(function(localStream) {
                localVideo.current.srcObject = localStream;
                localStream.getTracks().forEach(track => talkiPC.addTrack(track, localStream));
            })
            .catch(handleGetUserMediaError);
    }

    const processMessage = (msg) => {
        if (msg.candidate) {
            var candidate = new RTCIceCandidate(msg.candidate);

            talkiPC.addIceCandidate(candidate).catch(reportError);
        } else if (msg.type === 'video-answer') {
            let desc = new RTCSessionDescription(msg.sdp);
            talkiPC.setRemoteDescription(desc).catch(reportError)
        }
    }

    const sendToServer = (message) => {
        signalling.publish({message, channel})
    }

    return {doCall, hangUpCall, processMessage}
}

export default TalkiRTC

