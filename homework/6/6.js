import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";
import { MemoryStore } from "https://deno.land/x/session/memory_store.ts";

const users = new Map();

const session = new Session(new MemoryStore());
const router = new Router();

await session.init();

router
  .post("/signup", async (ctx) => 
  {
       
    ctx.state.session.set("loggedIn", true);
    ctx.state.session.set("account", account);
  })
  .post("/login", async (ctx) => 
  {
    ctx.state.session.set("loggedIn", true);
    ctx.state.session.set("account", account);
  });

const app = new Application();


app.use(session.use()(session));

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started at: http://localhost:8000");
await app.listen({ port: 8000 });