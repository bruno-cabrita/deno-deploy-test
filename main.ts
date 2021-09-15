import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (ctx: Context) => {
    ctx.response.type = "application/json; charset=utf-8";
    return ctx.response.body = { message: "Hello, world!"};
  })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
    "localhost"}:${port}`,
    );
  });

await app.listen({port:8000});