import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use((c, next) => {
  c.req.raw.signal.addEventListener("abort", () => {
    console.log("aborted!");
  });

  return next();
});

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

app.get("/sleep", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 5_000));
  return c.text("Hello Hono!");
});

export default app;
