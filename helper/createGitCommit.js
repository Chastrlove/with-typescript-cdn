const getGitVersion = require("./gitVersion");
const fs = require("fs");

const { commit_sha_path } = require("./path");

const COMMIT_SHA = getGitVersion();

fs.writeFileSync(commit_sha_path, COMMIT_SHA);

console.log("✨ git commit sha create completely");
