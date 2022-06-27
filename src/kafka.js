const { Kafka, logLevel } = require('kafkajs');

module.exports = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
  requestTimeout: 20000,
  connectionTimeout: 20000,
  logLevel: logLevel.ERROR,
  retry: {
    maxRetryTime: 5000,
    retries: 999,
    initialRetryTime: 50,
  },
});
