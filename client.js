const { Socket } = require("dgram");
const net = require("net");
const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection({ port: 9000 }, () => {
  console.log("Client is connected to the server");
  client.write("CLIENT: Hello this is client!");

  client.on("data", (data) => {
    console.log("Data: " + data.toString());
  });

  client.on("end", () => {
    console.log("Client disconnected from server!");
  });

  r1.on("line", (input) => {
    client.write(`CLIENT : ${input}`);
  });
});
