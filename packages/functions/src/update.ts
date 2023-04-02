import { Table } from "sst/node/table";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2
) => {
  if (event.body && event.pathParameters?.id) {
    const data = JSON.parse(event.body);

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      // Get the table name from the environment variable
      TableName: Table.Notes.tableName,
      Key: {
        userId: "123",
        noteId: event.pathParameters.id, // A unique uuid
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":attachment": data.attachment || null,
        ":content": data.content || null,
      },
      ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Missing Body!" }),
  };
};
