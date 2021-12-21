const fs = require('fs');
const formatDistanceStrict = require('date-fns/formatDistanceStrict');

/**
 * @param {string} versionJsonPath
 * @param {Date} startedAt
 * @param {object} additionalData
 */
const getStatus = (versionJsonPath, startedAt, additionalData = {}) => {
    let versionJson = {};
    if (fs.existsSync(versionJsonPath)) {
        versionJson = JSON.parse(fs.readFileSync(versionJsonPath).toString());
        versionJson.builtAtRelative = `${formatDistanceStrict(new Date(versionJson.builtAt), new Date())} ago`;
    }
    return {
        ...versionJson,
        startedAt,
        startedAtRelative: `${formatDistanceStrict(startedAt, new Date())} ago`,
        ...additionalData
    };
};

module.exports = {
    getStatus,
};
