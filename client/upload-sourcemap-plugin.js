const path = require("path");
const fs = require("fs-extra");
const axios = require("axios").default;

class UploadSourcemapPlugin {
  uploadUrl = "";
  outputPath = "";

  constructor({ uploadUrl, token }) {
    this.uploadUrl = uploadUrl;
    this.token = token;
  }

  /**
   *
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    if (compiler.options.mode === "production") {
      compiler.hooks.done.tapPromise("UploadSourcemapPlugin", async (stats) => {
        try {
          const devtool = compiler.options.devtool;
          if (!!devtool) {
            this.outputPath = compiler.outputPath;
            const compilation = stats.compilation;
            const sourcemapFilesPath = Object.keys(compilation.assets)
              .filter((filePath) => {
                return (
                  filePath.endsWith(".js.map") || filePath.endsWith(".css.map")
                );
              })
              .map((filePath) => {
                return path.join(this.outputPath, filePath);
              });
            this.dealSourcemap(sourcemapFilesPath);
          }
        } catch (error) {}
      });
    }
  }

  async dealSourcemap(sourcemapFilesPath) {
    await this.uploadSourcemap(sourcemapFilesPath);
    await this.deleteSourcemap(sourcemapFilesPath);
  }

  async uploadSourcemap(sourcemapFilesPath) {
    for (let i = 0; i < sourcemapFilesPath.length; i++) {
      let filePath = sourcemapFilesPath[i];
      await this.upload(filePath, i);
    }
  }

  async upload(path, index) {
    const uploadUrl = `${this.uploadUrl}?token=${this.token}&filename=${path
      .split("/")
      .at(-1)}&clear=${+(index === 0)}`;
    const content = await fs.readFile(path, "utf-8");
    try {
      await axios.post(uploadUrl, {
        file: content,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async deleteSourcemap(sourcemapFilesPath) {
    await sourcemapFilesPath.forEach(async (path) => {
      await fs.remove(path);
      console.log(`success remove ${path}`);
    });
  }
}

export default UploadSourcemapPlugin;
