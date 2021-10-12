const fs = require('fs');
const formatDistanceStrict = require('date-fns/formatDistanceStrict');

/**
 * @param {string} versionJsonPath
 * @param {Date} startedAt
 */
const getStatus = (versionJsonPath, startedAt) => {
    return {
        ...JSON.parse(fs.readFileSync(versionJsonPath).toString()),
        startedAt,
        started: `${formatDistanceStrict(startedAt)} ago`,
    };
};

module.exports = {
    getStatus,
};
