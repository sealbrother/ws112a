import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const users = new Map();

const router = new Router();

router
  .post("/signup", async (ctx) => 
  {
    const { account, password } = await ctx.request.body().value;

    if (users.has(account)) 
    {
      ctx.response.body = { success: false, message: "帳號已被使用！" };
    } else 
    {
      users.set(account, { password });
      ctx.response.body = { success: true, message: "註冊成功！" };
    }
  })
  .post("/login", async (ctx) => 
  {
    const { account, password } = await ctx.request.body().value;

    if (users.has(account) && users.get(account).password === password)
    {
      ctx.response.body = { success: true, message: "登入成功！" };
    } else 
    {
      ctx.response.body = 
      {
        success: false,
        message: "登入失敗，請檢查帳號密碼是否有錯！",
      };
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started at: http://localhost:8000");
await app.listen({ port: 8000 });