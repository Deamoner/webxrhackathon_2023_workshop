const crypto=require("crypto").webcrypto
require('dotenv').config();
function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}
function makeid(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    let randomNum=getRandomIntInclusive(0,10000)/10000;
    console.log(randomNum);
    result += characters.charAt(Math.floor(randomNum * charactersLength));
    counter += 1;
  }
  console.log("Results",result);
  return result;
}
if (process.env.CDK_DEFAULT_QUALIFIER) {
  console.log(process.env.CDK_DEFAULT_QUALIFIER);
  return;
}
else{
  process.env['CDK_DEFAULT_QUALIFIER']=makeid(5);
}