const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  const checkDuplicate = notes.find(itr => itr.title === title);

  if (checkDuplicate) console.log(chalk.red("Duplicate title found"));
  else {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
  }
};

const removeNotes = title => {
  let presence = 0;
  const notes = loadNotes();
  const updatedNotes = notes.filter(itr => {
    if (itr.title !== title) {
      return itr;
    } else presence++;
  });
  if (presence) saveNotes(updatedNotes);
  else console.log(chalk.red("Invalid Query"));
};

const readNotes = title => {
  let allNotes = loadNotes().find(itr => itr.title === title);
  allNotes
    ? console.log(chalk.blue(title) + "\n" + allNotes.body)
    : console.log(chalk.red("Invalid Query"));
};

const saveNotes = notes => {
  console.log(chalk.blue("Success!"));
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    const fileContent = fs.readFileSync("./notes.json");
    return JSON.parse(fileContent);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  loadNotes: loadNotes,
  readNotes: readNotes
};
