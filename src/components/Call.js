import React, { Component } from 'react'
import TalkiRTC from "./services/rtc/TalkiRTC";
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
        this.fluentName = props.fluentName
        this.talkiName = props.talkiName

        this.signalling = new PubNubReact({ publishKey: 'pub-c-b62c19de-59df-4410-8abc-665b6eea4215', subscribeKey: 'sub-c-db022eb0-85d5-11e6-8409-0619f8945a4f' });
        this.signalling.init(this)

        this.rtc = TalkiRTC(this.signalling, this.channel, this.fluentName, this.talkiName, this.localVideoRef, this.remoteVideoRef)
    }

    componentWillMount() {
        this.signalling.getMessage(this.channel, (msg) => {
            this.rtc.processMessage(msg)
        })
    }

    componentDidMount() {
        this.rtc.doCall()
    }

    render() {
        return (
            <div>

                <video ref={this.localVideoRef} width="50" height="40" autoPlay playsInline></video>
                <video ref={this.remoteVideoRef} width="320" height="240" autoPlay playsInline></video>

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