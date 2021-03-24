const fs = require("fs");

const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  commit_sha_path: resolveApp(`${appDirectory}/.COMMIT_SHA`),
};
