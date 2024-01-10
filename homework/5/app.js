import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

const router = new Router();

router
  .get("/posts", async (ctx) => {
    const posts = [];
    for (const [id, title, body] of db.query("SELECT id, title, body FROM posts")) {
      posts.push({ id, title, body });
    }
    ctx.response.body = { posts };
  })
  .get("/posts/:id", async (ctx) => {
    const post = db.query("SELECT id, title, body FROM posts WHERE id = ?", [ctx.params.id]);
    if (post.length === 0) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: "Post not found" };
    } else {
      ctx.response.body = { post };
    }
  })
  .post("/posts", async (ctx) => {
    const body = ctx.request.body();
    if (body.type === "json") {
      const { title, body: postBody } = await body.value;
      db.query("INSERT INTO posts (title, body) VALUES (?, ?)", [title, postBody]);
      ctx.response.body = { message: "Post created successfully" };
    } else {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "Invalid request body" };
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;
console.log(`Server running on http://localhost:${PORT}`);
await app.listen({ port: PORT });
