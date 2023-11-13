#!/usr/bin/node
const  exec  = require("child_process").exec;

const funcOut = (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else if(stdout){
        console.log(`Result: ${stdout}`);

    }
    else if(stderr){
        console.error(`stderr: ${stderr}`);
    }
    else{
        console.log("Completed");
    }
  }

const command0=`aws sts get-caller-identity --query "Account" --output text`;
const command1=`aws configure get region`;

function returnOutput(){}

async function execCommand(command,value){
    const returnOutput=(error,stdout,stderr)=>{
        console.log(stdout);
        return stdout
    }
    const x =await exec(command,returnOutput,funcOut)
    console.log(x);
}
// process.env.CDK_DEFAULT_ACCOUNT=execCommand(command0);
// process.env.CDK_DEFAULT_REGION=execCommand(command1);

execCommand(command0,"CDK_DEFAULT_ACCOUNT")