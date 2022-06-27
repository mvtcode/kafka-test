const kafka = require('./kafka');

const producer = kafka.producer({
  metadataMaxAge: 60000,
  retry: {
    maxRetryTime: 5000,
    retries: 999,
    initialRetryTime: 50,
  },
});
producer.on('producer.disconnect', () => {
  console.log('producer.disconnect');
});

(async () => {
  await producer.connect();
  let i = 0;
  setInterval(async () => {
    console.log('Producer send:', i);
    await producer.send({
      topic: 'test-topic',
      messages: [
        {
          key: 'test1',
          value: `Hello KafkaJS: ${ i++ }`
        },
      ],
      acks: 1,
    });
  }, 2000);
})().catch(console.error);