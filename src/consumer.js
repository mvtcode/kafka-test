const { Kafka, logLevel } = require('kafkajs')

const kafka = require('./kafka');

const consumer = kafka.consumer({
  groupId: 'test-group',
});

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        message: {
          key: message.key.toString(),
          message: message.value.toString(),
        }
      })
    },
  });
})().catch(console.error);