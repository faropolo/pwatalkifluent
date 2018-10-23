import { API } from 'aws-amplify';

function getWaitingTalki() {
    let apiName = 'Talki';
    let path = '/call/talki'; 
    let myInit = { 
        headers: {   
            "Access-Control-Allow-Headers": "Access-Control-Allow-Methods, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
        },
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        queryStringParameters: {  
            userID: '22222'
        }
    }
    return API.get(apiName, path, myInit)
}

export default {
    getWaitingTalki,
}
