#!/usr/bin/node
const { exec } = require("child_process");

const data = require("../config.json");

exec(
  `aws cognito-idp admin-set-user-password --user-pool-id ${data.Auth.userPoolId} --username ${process.argv[2]} --password ${process.argv[3]} --permanent --region ${data.Auth.region}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    else if(stdout){
        console.log(`stdout: ${stdout}`);
    }
    else if(stderr){
        console.error(`stderr: ${stderr}`);
    }
    else{
        console.log("Completed");
    }
  }
);