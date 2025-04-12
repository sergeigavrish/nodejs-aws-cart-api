import { Stack, StackProps } from 'aws-cdk-lib';
import {
  Code,
  FunctionUrlAuthType,
  HttpMethod,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../../.env') });

export class CartServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environment = {
      DB_HOST: process.env.DB_HOST!,
      DB_PORT: process.env.DB_PORT!,
      DB_USERNAME: process.env.DB_USERNAME!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
      DB_DATABASE: process.env.DB_DATABASE!,
    };

    const cartHandlerFunction = new LambdaFunction(this, 'CartServiceHandler', {
      code: Code.fromAsset(path.join(__dirname, '../../dist')),
      handler: 'lambda.handler',
      runtime: Runtime.NODEJS_22_X,
      environment,
    });

    cartHandlerFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [HttpMethod.ALL],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    });
  }
}
