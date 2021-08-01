/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyPlugin = require("copy-webpack-plugin");

function resolvePath(res) {
  return path.resolve(__dirname, res);
}

function joinPath(res) {
  return path.join(__dirname, res);
}

module.exports = (_env, args) => {
  const isDevelopment = args.mode === "development";
  const environmentFilePath = isDevelopment ? "../.env.test" : "../.env.local";

  const dirs = {
    outputDir: resolvePath("../dist"),
    appDir: resolvePath("../lib/src"),
    assetsDir: resolvePath("../lib/assets"),
    serverDir: joinPath("../dist"),
    environmentFile: resolvePath(environmentFilePath),
  };

  const serverConfig = isDevelopment && {
    devtool: "source-map",
    devServer: {
      open: true,
      hot: true,
      contentBase: path.join(__dirname, "../dist"),
      compress: false,
      publicPath: "/",
      historyApiFallback: true,
      port: 10225,
    },
  };

  return {
    entry: {
      index: "./lib/index.js",
    },
    output: {
      path: dirs.outputDir,
      filename: "js/[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@app": dirs.appDir,
        "@assets": dirs.assetsDir,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-typescript",
                  [
                    "@babel/preset-react",
                    {
                      runtime: "automatic",
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.(svg)/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(scss)/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "public", to: "" }],
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify({
          ...dotenv.config({ path: dirs.environmentFile }).parsed,
          isDevelopment,
        }),
      }),
    ],
    ...serverConfig,
  };
};
