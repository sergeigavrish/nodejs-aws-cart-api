import * as serverless from 'serverless-http';
import { Handler, Context, Callback } from 'aws-lambda';
import { bootstrapServerless } from './bootstrap';

let server: Handler;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    const app = await bootstrapServerless();
    server = serverless(app);
  }
  return server(event, context, callback);
};
