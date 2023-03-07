const Koa = require("koa");
const koaStatic = require("koa-static");
const path = require("path");
const app = new Koa();

app.use(koaStatic(path.join(__dirname, "build")));

app.listen(4000, () => {
  console.log("server start");
});
