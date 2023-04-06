const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
  const data = await fs.readFile("questions.json", "utf8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("questions.json", JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.questions) {
    throw new NotFoundError("Could not find any questions.");
  }
  return storedData.questions;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.questions || storedData.questions.length === 0) {
    throw new NotFoundError("Could not find any questions.");
  }

  const question = storedData.questions.find((ev) => ev.id === id);
  if (!question) {
    throw new NotFoundError("Could not find question for id " + id);
  }

  return question;
}

async function add(data) {
  const storedData = await readData();
  data.id = generateId();
  data.questions.forEach((question) => {
    question.id = generateId();
    if (question.type === "multiple_choice") {
      question.options.forEach((option) => {
        option.id = generateId();
      });
    }
  });
  storedData.questions.unshift(data);
  await writeData(storedData);
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
