import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const app = new Application();
const db = new DB("blog.db");

db.query(
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)"
);

const router = new Router();

router
  .get("/", (ctx) => ctx.response.redirect("/public/index.html"))
  .get("/list", list)
  .get("/post/:id", show)
  .post("/post", create)
  .get("/public/(.*)", pub);

app.use(router.routes());
app.use(router.allowedMethods());

async function pub(ctx) 
{
  console.log("path=", ctx.request.url.pathname);
  await send(ctx, ctx.request.url.pathname, 
  {
    root: `${Deno.cwd()}/`,
    index: "index.html",
  });
}

async function list(ctx) 
{
  const posts = await db.query("SELECT * FROM posts");
  ctx.response.type = "application/json";
  ctx.response.body = posts;
}

async function show(ctx) 
{
  const id = ctx.params.id;
  const post = await db.query(
    "SELECT * FROM posts WHERE id = ?",
    id
  );
  if (!post.length) ctx.throw(404, "invalid post id");
  ctx.response.type = "application/json";
  ctx.response.body = post[0];
}

async function create(ctx) 
{
  const body = ctx.request.body(); // content type automatically detected
  console.log("body = ", body);
  if (body.type === "json") 
  {
    const { title, body } = await body.value;
    await db.query(
      "INSERT INTO posts (title, body) VALUES (?, ?)",
      title,
      body
    );
    ctx.response.body = "success";
    console.log("create:save=>", { title, body });
  }
}

console.log("Server run at http://127.0.0.1:8001");
await app.listen({ port: 8001 });