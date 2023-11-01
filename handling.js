const fs = require("fs");
const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentFilename = "";

function performFileOperation() {
  r1.question(
    "Select an operation (1. Create, 2. Read, 3. Write, 4. Rename, 5. Append, 6. Delete, -1. Exit): ",
    (choice) => {
      choice = parseInt(choice);

      if (choice === -1) {
        console.log("Exiting the program.");
        r1.close();
        return;
      }

      switch (choice) {
        case 1:
          r1.question("Enter the filename for creation: ", (filename) => {
            currentFilename = filename;
            fs.writeFile(
              currentFilename,
              "This is entered on creation",
              (err) => {
                if (err) {
                  console.log("Error occurred in creating file: ", err);
                } else {
                  console.log("File created successfully!");
                }
                performFileOperation();
              }
            );
          });
          break;

        case 2:
          fs.readFile(currentFilename, "utf-8", (err, data) => {
            if (err) {
              console.log("Error occurred in reading file: ", err);
            } else {
              console.log("File read successfully!");
              console.log("File Data: ", data);
            }
            performFileOperation();
          });
          break;

        case 3:
          fs.writeFile(currentFilename, "New content written", (err) => {
            if (err) {
              console.log("Error occurred in writing to the file: ", err);
            } else {
              console.log("Changes written successfully!");
            }
            performFileOperation();
          });
          break;

        case 4:
          r1.question("Enter the new name for the file: ", (newName) => {
            fs.rename(currentFilename, newName, (err) => {
              if (err) {
                console.log("Error occurred in renaming the file: ", err);
              } else {
                console.log("File renamed successfully!");
                currentFilename = newName;
              }
              performFileOperation();
            });
          });
          break;

        case 5:
          fs.appendFile(
            currentFilename,
            "\nThis content was appended",
            (err) => {
              if (err) {
                console.log("Error occurred in appending to the file: ", err);
              } else {
                console.log("Content appended successfully!");
              }
              performFileOperation();
            }
          );
          break;

        case 6:
          fs.unlink(currentFilename, (err) => {
            if (err) {
              console.log("Error occurred during deleting the file: ", err);
            } else {
              console.log("File deleted successfully");
            }
            performFileOperation();
          });
          break;

        default:
          console.log("Please select a valid input.");
          performFileOperation();
      }
    }
  );
}

performFileOperation();
