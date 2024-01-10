export function layout(title, content) 
{
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      input[type=tel],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
        margin-bottom: 10px;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>${title}</h1>
    </header>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `;
}

export function list(posts) {
  let list = [];
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/post/${post.id}">足夠詳細資訊</a></p>
    </li>
    `);
  }
  let content = `
  <p>你總共有<strong>${posts.length}</strong>位聯絡人可以聯絡</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `;
  return layout('通訊錄', content);
}

export function newPost() {
  return layout('新增聯絡人', `
  <h1>新增聯絡人</h1>
  <p>聯絡人資料</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="姓氏名字" name="title" required></p>
    <p><input type="tel" placeholder="電話號碼 (格式：xxxx-xxx-xxx)" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" name="body" required></p>
    <p><input type="submit" value="新增"></p>
  </form>
  `);
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `);
}

export function search() {
  return layout('查詢聯絡人', `
  <h1>查詢聯絡人</h1>
  <form action="/search" method="post">
    <p><input type="text" placeholder="姓名" name="name" required></p>
    <p><input type="submit" value="查詢"></p>
  </form>
  `);
}

export function found(name, number) {
  return layout('搜尋結果', `
  <h1>搜尋結果</h1>
  <h2>名字：${name}</h2>
  <p>電話：${number}</p>
  `);
}

export function not_found() {
  return layout('查詢聯絡人', `
  <h1>查詢聯絡人</h1>
  <form action="/search" method="post">
    <p><input type="text" placeholder="姓氏名字" name="name" required></p>
    <p><input type="submit" value="查詢"></p>
  </form>
  <h1>查無此人</h1>
  `);
}