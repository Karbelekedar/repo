const http = require("http");
const events = require("events");

const hostname = "127.0.0.1";
const port = 8081;

const myEmitter = new events.EventEmitter();

myEmitter.on("ping", (data) => {
  console.log("Ping :" + data);
});

myEmitter.emit("ping", "My First NodeJs ping!!");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
