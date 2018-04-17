module.exports.filesPath= '/tmp/' || __dirname + '/files/'; // must have the slash at the end
module.exports.port = process.env.APP_PORT || 3000;
module.exports.blockchainURL = process.env.BLOCKCHAIN_URL || 'http://192.168.1.50:3000/api/';