#!/usr/bin/node
const  exec  = require("child_process").exec;

const data = require("../config.json");
const funcOut = (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else if(stdout){
        console.log(`Result: ${stdout.AuthenticationResult.AccessToken}`);

    }
    else if(stderr){
        console.error(`stderr: ${stderr}`);
    }
    else{
        console.log("Completed");
    }
  }

async function execCommand(command,value){
    const returnOutput=(error,stdout,stderr)=>{
        // console.log(stdout);
        console.log(JSON.parse(stdout).AuthenticationResult.IdToken)
        // return stdout
    }
    await exec(command,returnOutput,funcOut)
}
const username=process.argv[2]
const password=process.argv[3]
command0=`aws cognito-idp initiate-auth --region ${data.Auth.region} --auth-flow USER_PASSWORD_AUTH --client-id ${data.Auth.userPoolWebClientId} --auth-parameters USERNAME=${username},PASSWORD=${password}`

execCommand(command0)