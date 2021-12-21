const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const process = require('process');

const outputFile = process.argv[2];
if (!outputFile) {
    throw new Error('Usage: node write-version-json.js outputPath');
}
const outputPath = path.join(process.cwd(), outputFile);

function getBranchName() {
    try {
        const cmd = 'git rev-parse --abbrev-ref HEAD';
        let branch = execSync(cmd).toString();
        branch = branch.replace(/^\s+|\s+$/g, '');

        return branch;
    } catch (e) {
        return null;
    }
}

function getCommitHash() {
    try {
        const cmd = 'git rev-parse --short=7 HEAD';
        let hash = execSync(cmd).toString();
        hash = hash.replace(/^\s+|\s+$/g, '');

        return hash;
    } catch (e) {
        return null;
    }
}

function getUser() {
    return process.env.USER || null;
}

function generateTimestamp() {
    return Math.floor(Date.now() / 1000);
}

const versionJson = {
    builtAt: new Date().toISOString(),
    builtBy: getUser(),
    branch: getBranchName(),
    commit: getCommitHash(),
    timestamp: generateTimestamp(),
};

console.log('Version...');
console.log(JSON.stringify(versionJson, '', 4));

fs.writeFileSync(outputPath, JSON.stringify(versionJson));
console.log(`Written to ${outputPath}`);
