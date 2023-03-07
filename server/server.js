const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");
const router = require("./router");

app.use(
  koaBody({
    multipart: true,
  })
);
app.use(router.routes());

app.listen(3000, () => {
  console.log("server start");
});
