const fs = require('fs');
const path = require('path');

let tasks;

exports.lastId = () => {
  let id = -1;
  tasks.forEach(t => {
    // eslint-disable-next-line prefer-destructuring
    if (t.id > id) id = t.id;
  });
  return id;
};

exports.saveJSON = callback => {
  const tasksJSON = JSON.stringify(tasks);
  fs.writeFile(
    path.join(__dirname, '..', 'files', 'users.json'),
    tasksJSON,
    'utf-8',
    callback
  );
};

const readJSON = () => {
  const data = fs.readFileSync(
    path.join(__dirname, '..', 'files', 'users.json'),
    'utf-8'
  );
  tasks = JSON.parse(data);
  return tasks;
};

tasks = readJSON();
exports.tasks = tasks;