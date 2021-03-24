const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const path = require("path");
const RemoveSentryPlugin = require("./script/deleteSourceMap");
const fs = require("fs");

let COMMIT_SHA;

const { commit_sha_path } = require("./helper/path");

if (fs.existsSync(commit_sha_path)) {
    COMMIT_SHA = fs.readFileSync("./.COMMIT_SHA").toString();
}

module.exports = {
  // productionBrowserSourceMaps: true,
    env: {
        // Make the COMMIT_SHA available to the client so that Sentry events can be
        // marked for the release they belong to. It may be undefined if running
        // outside of Vercel
        NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
    },
  webpack: (config, options) => {
      if (!options.isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }
     /* config.plugins.push(
          new SentryWebpackPlugin({
            include: ".next",
            ignore: ["node_modules"],
            stripPrefix: ["webpack://_N_E/"],
            urlPrefix: `~/_next`,
            release: COMMIT_SHA
          })
      );
      config.plugins.push(new RemoveSentryPlugin());*/

    return config;
  }
}
