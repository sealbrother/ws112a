import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router
  .get('/nqu/', (ctx) => {
    ctx.response.body = `
      <html>
        <body>
          <a href="https://www.nqu.edu.tw/">蔡杰叡幫你連到金門大學</a>
        </body>
      </html>`;
  })
  .get('/nqu/csie/', (ctx) => {
    ctx.response.body = `
      <html>
        <body>
          <a href="https://csie.nqu.edu.tw/">蔡杰叡幫你連到金門大學資工系</a>
        </body>
      </html>`;
  })
  .get('/to/nqu/', (ctx) => {
    ctx.response.redirect('https://www.nqu.edu.tw/');
  })
  .get('/to/nqu/csie/', (ctx) => {
    ctx.response.redirect('https://csie.nqu.edu.tw/');
  })
  .get('/room/:classroomCode', (ctx) => {
    const classroomCode = ctx.params.classroomCode;

    const classroomDescriptions = {
      'e320': '多媒體教室',
      'e319': '嵌入式實驗室',
    };

    const classroomDescription = classroomDescriptions[classroomCode];

    if (classroomDescription) {
      ctx.response.body = `
        <html>
          <body>
            <p>${classroomCode} 是 ${classroomDescription}</p>
          </body>
        </html>`;
    } else {
      ctx.response.body = `
        <html>
          <body>
            <p>找不到教室資訊</p>
          </body>
        </html>`;
    }d:\ccc wp1116\wp111b\ccc112a\4
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server started at: http://127.0.0.1:8000');
await app.listen({ port: 8000 });