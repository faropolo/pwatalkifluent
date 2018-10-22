import { API } from 'aws-amplify';

function getWaitingTalki() {
    let apiName = 'TalkiApiGateway';
    let path = '/talki/call/talki'; 
    let myInit = { 
        headers: {},
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {  
            userID: '22222'
        }
    }
    API.get(apiName, path, myInit).then(response => {
        // Add your code here
    }).catch(error => {
        console.log(error.response)
    });
}

export default {
    getWaitingTalki,
}