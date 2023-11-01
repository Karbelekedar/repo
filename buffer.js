const fs = require("fs");

var buf = Buffer.alloc(256);
len = buf.write("Hello Kedar!!");

fs.writeFile("buffer.txt", buf, (err) => {
  if (err) {
    console.log("Error writing to the file:", err);
  } else {
    console.log("Successfully written to the file");
  }

  fs.readFile("buffer.txt", (err, data) => {
    if (err) {
      console.log("Error reading from the file:", err);
    } else {
      const res = buf.toString();
      console.log("Data read :", res);
    }
  });
});
