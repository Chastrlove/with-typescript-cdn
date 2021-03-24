const fs = require("fs-extra");
const path = require("path");

const rootPath = path.join(__dirname, "../");

// 拷贝文件 / 文件夹到相应的目标文件
const copy = (function () {
    try {
        const targetDirName = "deployBuildFiles";

        fs.removeSync(path.join(rootPath, targetDirName));

        const needCopyFileName = ["package.json", "next.config.js", "yarn.lock", "server.js", "build", "src/tsconfig.json"];

        needCopyFileName.forEach((p) => {
            fs.copySync(path.join(rootPath, p), path.join(rootPath, `${targetDirName}/${p}`));
        });
    } catch (err) {
        console.log(err);
        throw err;
    }

})();