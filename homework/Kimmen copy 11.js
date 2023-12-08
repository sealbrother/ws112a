import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  const { request, response } = ctx;

  if (request.url.pathname === '/nqu/') {
    response.body = `
      <html>
        <body>
          <a href="https://www.nqu.edu.tw/">金門大學</a>
        </body>
      </html>`;
  } else if (request.url.pathname === '/nqu/csie/') {
    response.body = `
      <html>
        <body>
          <a href="https://csie.nqu.edu.tw/">金門大學資工系</a>
        </body>
      </html>`;
  } else if (request.url.pathname === '/to/nqu/') {
    response.redirect('https://www.nqu.edu.tw/');
  } else if (request.url.pathname === '/to/nqu/csie/') {
    response.redirect('https://csie.nqu.edu.tw/');
  }
});

console.log('Server started at: http://127.0.0.1:8000');

await app.listen({ port: 8000 });