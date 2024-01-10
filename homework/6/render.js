export function layout(title, content) 
{
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      /* Your CSS styles here */
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

export function list(posts) 
{
  let list = [];
  for (let post of posts) 
  {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/post/${post.id}">Details</a></p>
    </li>
    `);
  }
  let content = `
  <p>You have <strong>${posts.length}</strong> contacts!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `;
  return layout('Contacts', content);
}

export function newPost() 
{
  return layout('New Contact', `
  <h1>New Contact</h1>
  <p>Contact Information</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Name" name="title" required></p>
    <p><input type="tel" placeholder="Phone Number (format: xxxx-xxx-xxx)" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" name="body" required></p>
    <p><input type="submit" value="Add"></p>
  </form>
  `);
}

export function show(post) 
{
  return layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
  `);
}

export function search() 
{
  return layout('Search Contacts', `
  <h1>Search Contacts</h1>
  <form action="/search" method="post">
    <p><input type="text" placeholder="Name" name="name" required></p>
    <p><input type="submit" value="Search"></p>
  </form>
  `);
}

export function found(name, number) 
{
  return layout('Search Result', `
  <h1>Search Result</h1>
  <h2>Name: ${name}</h2>
  <p>Phone: ${number}</p>
  `);
}

export function not_found()
{
  return layout
  ('Search Contacts', `
  <h1>Search Contacts</h1>
  <form action="/search" method="post">
    <p><input type="text" placeholder="Name" name="name" required></p>
    <p><input type="submit" value="Search"></p>
  </form>
  <h1>No results found</h1>
  `);
}