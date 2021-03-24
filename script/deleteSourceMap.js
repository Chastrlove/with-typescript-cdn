const fs = require("fs");
const path = require("path");

const DEFAULT_DELETE_REGEX = /\.map$/;

const innerRegex = /\s*[#@]\s*sourceMappingURL\s*=\s*([^\s'"]*)\s*/;

/* eslint-disable prefer-template */
const sourceMappingURLRegex = RegExp(
    "(?:" +
    "/\\*" +
    "(?:\\s*\r?\n(?://)?)?" +
    "(?:" +
    innerRegex.source +
    ")" +
    "\\s*" +
    "\\*/" +
    "|" +
    "//(?:" +
    innerRegex.source +
    ")" +
    ")" +
    "\\s*"
);


function getSourceMappingURL(code) {
    const lines = code.split(/^/m);
    let match;

    for (let i = lines.length - 1; i >= 0; i--) {
        match = lines[i].match(sourceMappingURLRegex);
        if (match) {
            break;
        }
    }

    const sourceMappingURL = match ? match[1] || match[2] || "" : null;

    return {
        sourceMappingURL: sourceMappingURL
            ? decodeURI(sourceMappingURL)
            : sourceMappingURL,
        replacementString: match ? match[0] : null,
    };
}

class RemoveSentrySourceMapPlugin {
  apply(compiler) {
    compiler.hooks.done.tapPromise("SentryClearPlugin", async (stats) => {
      await this.deleteFiles(stats);
    });
  }
  getAssetPath(compilation, name) {
    return path.join(compilation.getPath(compilation.compiler.outputPath), name.split("?")[0]);
  }
  async deleteFiles(stats) {
    Object.keys(stats.compilation.assets)
      .filter((name) => DEFAULT_DELETE_REGEX.test(name))
      .forEach((name) => {
        const sourceMapFilePath = this.getAssetPath(stats.compilation, name);
        const codeFilePath = this.getAssetPath(stats.compilation,name.replace(DEFAULT_DELETE_REGEX,""));
        if(codeFilePath){
            fs.readFile(codeFilePath,'utf8',(err,data)=>{
                if (err) {
                    return console.log(err);
                }
                const {replacementString} = getSourceMappingURL(data);
                const result = data.replace(replacementString,"");
                fs.writeFile(codeFilePath, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            })
        }
        if (sourceMapFilePath) {
          fs.unlinkSync(sourceMapFilePath);
        } else {
          console.warn(
            `unable to delete '${name}'. ` +
              "File does not exist; it may not have been created " +
              "due to a build error."
          );
        }
      });
  }
}
module.exports = RemoveSentrySourceMapPlugin;
