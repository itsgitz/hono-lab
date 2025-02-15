import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/", async (c) => {
  return c.json({
    message: `Hono deployed with SST to AWS Lambda`,
  });
});

export const handler = handle(app);
