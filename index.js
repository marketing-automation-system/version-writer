const fs = require('fs');
const path = require('path');
const formatDistanceStrict = require('date-fns/formatDistanceStrict');

/**
 * @param {Date} startedAt
 */
const getStatus = (startedAt) => {
    return {
        ...JSON.parse(fs.readFileSync(path.resolve(__dirname, 'version.json')).toString()),
        startedAt,
        started: `${formatDistanceStrict(startedAt)} ago`,
    };
};

module.exports = {
    getStatus,
};
