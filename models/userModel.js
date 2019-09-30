const fs = require('fs');
const path = require('path');

let users;

exports.lastId = () => {
  let id = -1;
  users.forEach(u => {
    // eslint-disable-next-line prefer-destructuring
    if (u.id > id) id = u.id;
  });
  return id;
};

exports.lastIdTask = (user) => {
  let id = -1;
  const tasks = user.tasks;
  tasks.forEach(t => {
    // eslint-disable-next-line prefer-destructuring
    if (t.id > id) id = t.id;
  });
  return id;
};

exports.validate = (name, email, password, passwordConfirmation) => {
  const errors = {
    name: [],
    email: [],
    password: [],
    passwordConfirmation: [],
    isErrors: function() {
      return (
        this.name.length > 0 ||
        this.email.length > 0 ||
        this.password.length > 0 ||
        this.passwordConfirmation.length > 0
      );
    }
  };

  if (!name) {
    errors.name.push('Por favor, informe o seu nome.');
  }
  if (!email) {
    errors.email.push('Por favor, informe o seu e-mail.');
  }
  
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('A senha informada não é igual à confirmação.');
  }

  return errors;
};

exports.update = (user, task) => {
  users.forEach(u => {
    if(u.id === user.id){
      u.tasks.push(task);
    }
  });
};

//erro aqui
exports.completeTask = (user, task) => {
  users.forEach(u => {
    if(u.id === user.id){
      if(u.tasks.task.id === task.id){ 
        u.tasks.task.status = 1;
      }
    }
  });
};

exports.saveJSON = callback => {
  const usersJSON = JSON.stringify(users);
  fs.writeFile(
    path.join(__dirname, '..', 'files', 'users.json'),
    usersJSON,
    'utf-8',
    callback
  );
};

const readJSON = () => {
  const data = fs.readFileSync(
    path.join(__dirname, '..', 'files', 'users.json'),
    'utf-8'
  );
  users = JSON.parse(data);
  return users;
};

users = readJSON();
exports.users = users;