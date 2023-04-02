import * as uuid from "uuid";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);

    const params = {
      // Get the table name from the environment variable
      TableName: Table.Notes.tableName,
      Item: {
        userId: "123",
        noteId: uuid.v1(), // A unique uuid
        content: data.content, // Parsed from request body
        createdAt: Date.now(),
      },
    };
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Missing Body!" }),
  };
};
