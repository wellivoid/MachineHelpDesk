import server from './server/Server';

//const port = 3000;

server.listen(process.env.PORT || 3000, () => {
  console.log(`Serviso rodando na porta ${process.env.PORT || 3000}`);
});