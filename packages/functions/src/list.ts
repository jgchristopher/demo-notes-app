import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (_event) => {
  const params: DynamoDB.DocumentClient.QueryInput = {
    // Get the table name from the environment variable
    TableName: Table.Notes.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params).promise();
  if (result.Items) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  }
  throw new Error("Missing Info");
  // return {
  //   statusCode: 500,
  //   body: JSON.stringify({ error: "Missing Body!" }),
  // };
};
