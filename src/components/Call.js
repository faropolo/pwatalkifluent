import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';

class Call extends Component {

    constructor(props) {
        super(props)

        this.status = {
            remoteViewSrc: null,
            localViewSrc: null
        }

        this.localVideoRef = React.createRef();
        this.remoteVideoRef = React.createRef();

        this.channel = props.channel;
        this.pubnub = new PubNubReact({ publishKey: 'pub-c-b62c19de-59df-4410-8abc-665b6eea4215', subscribeKey: 'sub-c-db022eb0-85d5-11e6-8409-0619f8945a4f' });
        this.pubnub.init(this);

        this.constraints = {audio: true, video: true};
        let configuration = {iceServers: [{urls: 'stun:stun1.l.google.com:19302'}]};
        this.pc = new RTCPeerConnection(configuration);
    }

    componentWillMount() {
        this.pubnub.subscribe({ channels: [ this.channel ], withPresence: true });
        
        this.pubnub.getMessage( this.channel, (msg) => {
            let {desc, candidate} = msg

            try {
                if (desc) {
                    // if we get an offer, we need to reply with an answer
                    if (desc.type === 'offer') {
                        this.pc.setRemoteDescription(desc);
                        
                        navigator.mediaDevices.getUserMedia(this.constraints).then( stream =>{
                            stream.getTracks().forEach( track => {
                                this.pc.addTrack(track, stream);
                            })

                            this.pc.createAnswer().then( answer => {
                                this.pc.setLocalDescription( answer );
                                this.pubnub.publish({desc: this.pc.localDescription, channel: this.channel});
                            })
                        })    
                        
                  } else if (desc.type === 'answer') {
                        this.pc.setRemoteDescription(desc);
                  } else {
                        console.log('Unsupported SDP type.');
                  }
                } else if (candidate) {
                    this.pc.addIceCandidate(candidate);
                }
            } catch (err) {
                console.error(err);
            }

        });
        
        this.pubnub.getStatus((st) => {
          this.pubnub.publish({ message: 'Mandei bale pelo Client', channel: this.channel });
        });

        this.pc.onicecandidate = (iceEvent) => {
            let {candidate} = iceEvent
            this.pubnub.publish({candidate, channel: this.channel}).catch( err => { console.log(err)})
        };

        this.pc.onnegotiationneeded = async () => {
            try {
              await this.pc.setLocalDescription(await this.pc.createOffer());
              // send the offer to the other peer
              this.pubnub.publish({desc: this.pc.localDescription, channel: this.channel})
                .catch( err => {
                    console.log(err)
                });
            } catch (err) {
              console.error(err);
            }
        };

        this.pc.ontrack = (event) => {
            // don't set srcObject again if it is already set.
            if (this.state.remoteViewSrc) return;
            this.setState ({ remoteViewSrc: event.streams[0] });

            // if (this.remoteVideoRef.current && this.remoteVideoRef.current.srcObject !== this.props.stream) {
            //     this.remoteVideoRef.current.srcObject = this.state.remoteViewSrc;
            // }
        };

        navigator.mediaDevices.getUserMedia(this.constraints).then( stream => {
            stream.getTracks().forEach((track) => {
                this.pc.addTrack(track, stream)
            });
            this.localVideoRef.current.srcObject = stream
            // this.setState({ localViewSrc : stream})
        })
    }

    componentWillUnmount() {
        this.pubnub.unsubscribe({ channels: [ this.channel ] });
    }

    componentDidUpdate() {
        if (this.localVideoRef.current && this.localVideoRef.current.srcObject !== this.state.localViewSrc) {
            this.localVideoRef.current.srcObject = this.state.localViewSrc;
        }
        if (this.remoteVideoRef.current && this.remoteVideoRef.current.srcObject !== this.state.localViewSrc) {
            this.remoteVideoRef.current.srcObject = this.state.localViewSrc;
        }

        console.log(this.localVideoRef)
        console.log(this.remoteVideoRef)
    }

    render() {
        return (
            <div>

                {/* <video ref={ video => {video.srcObject = this.state.localViewSrc}} autoPlay playsInline></video> */}

                <video ref={this.localVideoRef} autoPlay playsInline></video>
                <video ref={this.remoteVideoRef}  autoPlay playsInline></video>

                <div>
                    <button id="startButton">Start</button>
                    <button id="callButton">Call</button>
                    <button id="hangupButton">Hang Up</button>
                </div>
            </div>
        )
    }
}

export default Call;