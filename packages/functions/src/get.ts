import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters && event.pathParameters.id) {
    const params = {
      // Get the table name from the environment variable
      TableName: Table.Notes.tableName,
      Key: {
        userId: "123",
        noteId: event.pathParameters.id, // A unique uuid
      },
    };
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    }
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Missing Body!" }),
  };
};
