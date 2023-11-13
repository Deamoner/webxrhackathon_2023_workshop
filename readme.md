# Welcome to the AWS WebXR workshop
In this workshop, you will discover how to leverage a suite of AWS services to create a robust backend for your WebXR application. You'll learn how to host your app and make it publicly accessible via a URL, as well as how to efficiently render your assets from the cloud.

![Diagram Image](./webXR.png)

# AWS CDK 
In this workshop, we're utilizing the power of AWS Cloud Development Kit (AWS CDK) to streamline the setup of our backend services. AWS CDK provides a high-level, programmatic approach to defining cloud resources, allowing us to create complex infrastructure setups with just a few lines of code. With AWS CDK, we'll be able to rapidly provision and manage the services that form the backbone of our WebXR application, including hosting and asset rendering, all directly within the workshop environment. Experience firsthand the efficiency and flexibility that AWS CDK brings to cloud development.

# Prerequisite:

CDK setup: if you haven't had AWS CLI and AWS CDK set up, make sure you install aws cli first. 

```
pip install awscli 

```
or 

```
brew install awscli 

```

Run AWS CLI with the appropriate credentials and default region - please set the default region to us-east-1 

```
aws configure 

```
Install the AWS CDK CLI by 

```
npm install -g aws-cdk
```

# Jump to workshop one:
Select [workshop_one](https://gitlab.aws.dev/hukaiyin/webxrhackathon_2023_workshop/-/tree/workshop_one?ref_type=heads) from this repository's branches, and check out the code of this branch. 
