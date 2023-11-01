const { Readable, Writable, Duplex, Transform, pipeline } = require('stream');

// Static data
const data = '1\n2\n3\n4\n5\n';

// Create static streams
const readableStream = new Readable({
  read() {
    this.push(data);
    this.push(null); // No more data
  }
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Writable: ${chunk.toString()}`);
    callback();
  }
});

const duplexStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(`Duplex (Write): ${chunk.toString()}`);
    callback();
  },
  read(size) {
    if (this.currentValue > 5) {
      this.push(null); // No more data
      return;
    }
    this.push((this.currentValue++).toString());
  }
});

duplexStream.currentValue = 1;

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const transformedChunk = `Transformed: ${chunk.toString()}`;
    this.push(transformedChunk);
    callback();
  }
});

// Piping example
readableStream.pipe(duplexStream).pipe(transformStream).pipe(writableStream);

// Chaining example using the pipeline function
pipeline(
  readableStream,
  duplexStream,
  transformStream,
  writableStream,
  (err) => {
    if (err) {
      console.error('Pipeline Error:', err);
    } else {
      console.log('Pipeline completed successfully');
    }
  }
);
