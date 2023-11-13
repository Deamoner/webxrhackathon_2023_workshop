const amplifyConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'Replace_with_cdk_output',
    
    // REQUIRED - Amazon Cognito Region
    region: 'US-EAST-1',
    
    // REQUIRED- Amazon Cognito User Pool ID
    userPoolId: 'Replace_with_cdk_output',

    userPoolWebClientId: 'Replace_with_cdk_output',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,
  },
  Api: {
    url: 'Replace_with_cdk_output'
  }
};

export default amplifyConfig;