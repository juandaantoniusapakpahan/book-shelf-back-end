const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 4005,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.start();
  console.log(`Server berjalan di: ${server.info.uri}`);
};

init();
