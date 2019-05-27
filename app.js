const yargs = require("yargs");
const notes = require("./notes");
const chalk = require("chalk");

//curstomize yargs version

yargs.command({
  command: "add",
  describe: "Add new notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "body of notes",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});
1;

yargs.command({
  command: "remove",
  describe: "Removes a note",
  builder: {
    title: {
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "lists items",
  handler() {
    let listedNotes = notes.loadNotes();
    if (listedNotes.length) {
      console.log(chalk.green("Your Notes...\n\n"));
      listedNotes.forEach(itr => {
        console.log(chalk.blue(itr.title) + "\n");
      });
    } else console.log(chalk.red("No notes found"));
  }
});

yargs.command({
  command: "read",
  describe: "reads given Note",
  builder: {
    title: {
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
});
yargs.parse();
