const restHapi = require('rest-hapi');
const Hapi = require('@hapi/hapi');

async function start() {
  const server = Hapi.server({ port: 3000 });
  await restHapi.config({ appTitle: 'API' }).initialize(server, {
    mongo: { uri: process.env.DB_URI || 'mongodb://localhost:27017/test' },
    appTitle: 'My API',
    enableEndpoints: true
  });
  await server.start();
  console.log('Server running on', server.info.uri);
}

start();
