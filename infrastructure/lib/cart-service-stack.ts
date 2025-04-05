import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class CartServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cartHandlerFunction = new LambdaFunction(this, 'CartServiceHandler', {
      code: Code.fromAsset(path.join(__dirname, '../../dist')),
      handler: 'lambda.handler',
      runtime: Runtime.NODEJS_22_X,
    });

    const cartServiceApi = new RestApi(this, 'CartServiceApi', {
      deployOptions: {
        stageName: 'dev',
      },
      restApiName: 'Cart Service API',
    });

    const lambdaIntegration = new LambdaIntegration(cartHandlerFunction, {
      proxy: true,
    });

    cartServiceApi.root.addMethod('ANY', lambdaIntegration);
    cartServiceApi.root
      .addResource('{proxy+}')
      .addMethod('ANY', lambdaIntegration);
  }
}
