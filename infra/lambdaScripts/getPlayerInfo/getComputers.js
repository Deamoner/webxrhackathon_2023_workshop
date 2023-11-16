import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const dbClient = new DynamoDBClient({});

const computerTable = process.env.TABLE_NAME;

const getComputers = async (userid) => {
    try {
        const params = {
            TableName: computerTable,
            Key: {
                uId: { S: userid }
            }
        };
        
        let data = await dbClient.send(new GetItemCommand(params));
        data = data.Item;
        if (data == undefined) {
            console.log("No user data found.");
            return 0;
        }

        return parseInt(data);
    } catch (err) {
        throw err;
    }
}

export const handler = async (event, context) => {
    try {
        const userId = event.pathParameters.userId.toLowerCase();

        const computers = await getComputers(userId);

        const tmpResponse = [
            "24ba02d267cd4fcaae16eb69835fdfd7d89f023b5af23284d74981c70b5b371e"
        ];
        

        const response = {
            "computers": tmpResponse || computers,
           
        };

        return JsonResponse(200, response);
    } catch (err) {
        console.log(err);
        return JsonResponse(500, "Error getting user computers info.");
    }
}

const JsonResponse = (statusCode, body, mime = 'application/json') => {
    let response = {};
    try {
        response = {
            'statusCode': statusCode,
            'headers': {
                'Content-Type': mime,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET, PUT'
            },
            'body': JSON.stringify(body)
        }
        return response;
    } catch (error) {
        console.log(error);
        response = {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': "Check CloudWatch Logs for Response Error"
        }
        return response
    }
}