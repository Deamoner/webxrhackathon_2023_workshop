import * as cdk from 'aws-cdk-lib';
import * as helpers from '../components/helperScripts';
import { S3Bucket } from '../components/s3';
import {  LambdaStack } from '../components/lambda';
import { DDBTable } from '../components/ddb';
import { restGatewayNestedStack } from '../components/apigateway';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import { BillingMode } from 'aws-cdk-lib/aws-dynamodb';
import { WebSiteDeployment } from '../components/webSiteDistribution';

export class MainStack extends cdk.Stack {
  public mainStack: Main
  constructor(app: cdk.App, id: string, props?: cdk.StackProps) {
    super(app, id, props);
    const contextValues = {
    };
    this.mainStack = new Main(this, contextValues);
  }
}

export class Main {
  constructor(scope: cdk.Stack, contextValues: any) {
    //Make S3 Bucket
    const storageBucket = new S3Bucket(scope, "StorageBucket", cdk.RemovalPolicy.DESTROY);
    //DynamoDB Database
    const leaderboardDatabase = new DDBTable(scope, "LeaderboardDatabase", "playerId", undefined, BillingMode.PAY_PER_REQUEST, cdk.RemovalPolicy.DESTROY);
    
    // Add Global Secondary Index to Leaderboard Database for Ranking queries
    leaderboardDatabase.addGlobalSecondaryIndex({
      indexName: 'rankingIndex',
      partitionKey: {
        name: 'status',
        type: ddb.AttributeType.NUMBER
      },
      sortKey: {
        name: 'score',
        type: ddb.AttributeType.NUMBER
      }
    })
    
    const highScoreEnvs = {
      TABLE_NAME: leaderboardDatabase.tableName
    }

    //Make Nested Lambda Stack(s)
    /** Uncomment these lines for workshop step 3.1 
    const getHighScoreLambda = new LambdaStack(scope, "getPlayerInfoLambda", cdk.aws_lambda.Runtime.NODEJS_18_X, '../lambdaScripts/getPlayerInfo', 'handler', cdk.Duration.minutes(5), 512, 512, highScoreEnvs);
    const putHighScoreLambda = new LambdaStack(scope, "putPlayerRecordLambda", cdk.aws_lambda.Runtime.NODEJS_18_X, '../lambdaScripts/putPlayerRecord', 'handler', cdk.Duration.minutes(5), 512, 512, highScoreEnvs);
    */

    leaderboardDatabase.grantReadData(getHighScoreLambda.lambdaFunction);
    leaderboardDatabase.grantReadWriteData(putHighScoreLambda.lambdaFunction);
  
    //Build API Gateway
    /** Uncomment these API Gateway creation for workshop Step 4 
    const apiGateway = new restGatewayNestedStack(scope, "gateway", "Main Stack Gateway", "dev").gateway;
    apiGateway.AddMethodIntegration(putHighScoreLambda.MethodIntegration(), "leaderboard", "POST");
    apiGateway.AddMethodIntegration(getHighScoreLambda.MethodIntegration(), "leaderboard/{playerId}", "GET");
    */
   
    //Upload Website
    const website = new WebSiteDeployment(scope, "webDeployment", '../../web/dist', 'index.html', apiGateway, storageBucket);
       const configJson = {
        ...storageBucket.ExportConfig(),
        ...website.ExportConfig(),
        ...apiGateway.ExportConfig()
     }

    helpers.OutputVariable(scope, "Params", configJson, "Configuration")
  }
}
