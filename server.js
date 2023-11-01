const net = require("net");
const server = net.createServer();

server.on("connection", (socket) => {
  console.log(
    "A new connection has been made " +
      socket.remoteAddress +
      ":" +
      socket.remotePort
  );

  socket.on("data", (data) => {
    console.log("Data: " + data.toString());
  });

  socket.once("close", () => {
    console.log("Client connection closed!");
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.write("Server : Hello connection successfully made!!\n");
});

server.on("error", (err) => {
  if (err == EADDRINUSE) {
    console.log("Address in use");
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});

server.listen(9000, () => {
  console.log(`Server listening on port %j`, server.address().port);
});
