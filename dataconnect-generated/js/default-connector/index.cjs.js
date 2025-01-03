const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'luca',
  location: 'europe-north1'
};
exports.connectorConfig = connectorConfig;

