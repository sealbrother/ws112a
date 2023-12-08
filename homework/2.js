import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  const { request, response } = ctx;
  const { pathname } = request.url;

  if (pathname === '/nqu/') {
    response.body = `
      <html>
        <body>
          <a href="https://www.nqu.edu.tw/">金門大學</a>
        </body>
      </html>`;
  } else if (pathname === '/nqu/csie/') {
    response.body = `
      <html>
        <body>
          <a href="https://csie.nqu.edu.tw/">金門大學資工系</a>
        </body>
      </html>`;
  } else if (pathname.startsWith('/to/nqu/')) {
    response.redirect('https://www.nqu.edu.tw/');
  } else if (pathname.startsWith('/to/nqu/csie/')) {
    response.redirect('https://csie.nqu.edu.tw/');
  } else if (pathname.startsWith('/room/')) {
    const classroomCode = pathname.substring('/room/'.length);

    const classroomDescriptions = {
      'e320': '多媒體教室',
      'e319': '嵌入式實驗室',
    };

    const classroomDescription = classroomDescriptions[classroomCode];

    if (classroomDescription) {
      response.body = `
        <html>
          <body>
            <p>${classroomCode} 是 ${classroomDescription}</p>
          </body>
        </html>`;
    } else {
      response.body = `
        <html>
          <body>
            <p>找不到教室資訊</p>
          </body>
        </html>`;
    }
  }
});

console.log('Server started at: http://127.0.0.1:8000');
await app.listen({ port: 8000 });