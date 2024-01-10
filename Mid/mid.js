import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

const questions = [
  { id: 1, question: "誰是三國時期的五子良將之首？", answer: "張遼" },
  { id: 2, question: "誰在三國時期的蜀國煽動馬超叛亂？", answer: "彭羕" },
  { id: 3, question: "誰當過三國時期的吳國大嘟嘟？", answer: "陸遜" },
  { id: 4, question: "三國時期的誰當過曹操老大反被滅？", answer: "袁紹" },
  { id: 5, question: "三國時期的誰被稱為白馬將軍？", answer: "龐德" },
  { id: 6, question: "三國時期的誰當過孫權岳父還被孫策忌憚？", answer: "徐琨" },
  { id: 7, question: "三國時期的誰單挑郭氾(不念汜)勝利？", answer: "呂布" },
  { id: 8, question: "三國時期的誰跟曹丕內部鬥爭到收回兵權？", answer: "臧霸" },
  { id: 9, question: "三國時期的吳國誰親手殺了兩個有名有姓的首領還當敢死隊立過功？", answer: "董襲" },
  { id: 10, question: "三國時期的五虎上將誰完全沒跟過曹操？", answer: "趙雲" },
];

router.get("/", (ctx) => {
  ctx.response.body = questions.map((q) => ({ id: q.id, question: q.question }));
});

router.get("/:id", (ctx) => {
  const id = ctx.params.id;
  const question = questions.find((q) => q.id === parseInt(id));
  if (question) {
    ctx.response.body = { id: question.id, answer: question.answer };
  } else {
    ctx.response.body = { message: "找不到該問題" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });