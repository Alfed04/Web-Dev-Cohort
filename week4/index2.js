const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("Program to do the cli based tasks")
  .version("0.8.0");

program
  .command("count")
  .description("count the number of words in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const total = data.split(" ").length;
        console.log(`The ${file} has ${total} words`);
      }
    });
  });

program.parse();
