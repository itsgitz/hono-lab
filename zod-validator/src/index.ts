import { Hono } from "hono";
import { createUserSchema } from "./schema";
import { validator } from "./validator";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/user", zValidator("json", createUserSchema), async (c) => {
  const data = c.req.valid("json");
  return c.json({
    success: true,
    data,
  });
});

app.post("/user-custom", validator("json", createUserSchema), async (c) => {
  const data = c.req.valid("json");
  return c.json({
    success: true,
    data,
  });
});

// app.onError((err, c) => {
//   if (err instanceof HTTPException) {
//     return err.getResponse();
//   }
//
//   return c.json({
//     error: err.message,
//   });
// });

export default app;
