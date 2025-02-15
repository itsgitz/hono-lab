/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-awslambda",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const honoHandler = new sst.aws.Function("Hono", {
      url: true,
      handler: "src/index.handler",
    });

    const honoApi = new sst.aws.ApiGatewayV2("HonoApi");
    honoApi.route("ANY /{proxy+}", honoHandler.arn);
  },
});
