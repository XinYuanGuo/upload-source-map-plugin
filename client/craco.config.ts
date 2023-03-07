import { CracoConfig } from "@craco/types";
import WebpackBar from "webpackbar";
import UploadSourcemapPlugin from "./upload-sourcemap-plugin";

const cracoConfig: CracoConfig = {
  webpack: {
    plugins: {
      add: [
        new WebpackBar(),
        new UploadSourcemapPlugin({
          uploadUrl: "http://localhost:3000/upload-sourcemap",
          token: "test",
        }),
      ],
    },
    configure(config, context) {
      return config;
    },
  },
};

export default cracoConfig;
