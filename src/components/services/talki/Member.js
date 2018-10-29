import { API } from 'aws-amplify';

function createInstance() {
    let apiName = 'Talki';

    function saveMemberData( data ) {
        let path = '/member'; 
        let myInit = { 
            headers: {   
                "Access-Control-Allow-Headers": "Access-Control-Allow-Methods, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
            },

            body: data
        }

        return API.post(apiName, path, myInit)
    }

    return { saveMemberData }
}

export default {
    createInstance,
}
