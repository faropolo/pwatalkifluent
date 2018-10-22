
var config = {
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:62333dfc-1f2b-475e-aa2c-2daf9dcc6c41',
        
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_WcQRUDiqZ',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '40vno86ihtha9hqgcg7lug05hk',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - Cookie secure flag
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        //storage: new MyStorage(),
        
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    API: {
        endpoints: [
            {
                name: "Talki",
                endpoint: "https://api.talki.com.br/v1/talki/"
            }
        ]
    }
}

export default config;