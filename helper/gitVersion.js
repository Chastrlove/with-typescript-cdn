const getGitVersion = () => {
    const gitVersion = require('child_process').execSync('git rev-parse HEAD').toString().trim();

    if (gitVersion) {
        return gitVersion.substr(0, 10)
    }

    return ""
};

module.exports = getGitVersion;
