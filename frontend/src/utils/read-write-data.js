const fs = require('node:fs/promises');

const { v4: generateId } = require('uuid');

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

async function readData() {
  const data = await fs.readFile('forms.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('forms.json', JSON.stringify(data));
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.forms) {
    throw new NotFoundError('Could not find any forms.');
  }
  return storedData.forms;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.forms || storedData.forms.length === 0) {
    throw new NotFoundError('Could not find any forms.');
  }

  const form = storedData.forms.find((ev) => ev.id === id);
  if (!form) {
    throw new NotFoundError('Could not find form for id ' + id);
  }

  return form;
}

async function add(data) {
  const storedData = await readData();
  storedData.forms.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.forms || storedData.forms.length === 0) {
    throw new NotFoundError('Could not find any forms.');
  }

  const index = storedData.forms.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find form for id ' + id);
  }

  storedData.forms[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.forms.filter((ev) => ev.id !== id);
  await writeData({forms: updatedData});
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
