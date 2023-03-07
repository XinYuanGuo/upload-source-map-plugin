const Router = require("koa-router");
const router = new Router();
const qs = require("querystring");
const fs = require("fs-extra");
const path = require("path");
const sourceMapTool = require("source-map");

router.post("/upload-sourcemap", async (ctx) => {
  console.log("ctx", ctx.request.body);
  const { file } = ctx.request.body;
  const { querystring } = ctx.request;
  const result = qs.parse(querystring);
  let { token, filename, clear } = result;
  const projectDir = path.resolve(__dirname, "../", "project", token);
  if (~~clear && fs.existsSync(projectDir)) {
    fs.emptyDirSync(projectDir);
  } else {
    fs.mkdirpSync(projectDir);
  }
  fs.writeFileSync(path.join(projectDir, filename), file, {
    encoding: "utf-8",
  });
  ctx.res.statusCode = 200;
  ctx.res.end("");
});

router.get("/check-source-map", async (ctx) => {
  const { querystring } = ctx.request;
  const result = qs.parse(querystring);
  const { project, col, row, filename } = result;
  const filePath = path.resolve(
    __dirname,
    "../",
    "project",
    project,
    `${filename}.map`
  );
  try {
    const sourcemapFile = await fs.readFile(filePath, "utf-8");
    const errorInfo = await sourceMapTool.SourceMapConsumer.with(
      sourcemapFile,
      null,
      (consumer) => {
        const parseData = consumer.originalPositionFor({
          line: parseInt(row),
          column: parseInt(col),
        });

        return JSON.stringify(parseData);
      }
    );
    return ctx.res.end(errorInfo);
  } catch (error) {
    return ctx.res.end(error?.message);
  }
});

module.exports = router;
