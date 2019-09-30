const session = require('express-session');
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');

exports.addTask = (req, res) => {
  res.status(200).render('users/addTask', {
    title: 'Create Task',
    user: {}
  });
};

exports.validateTask = (req, res) => {
  const {title, description } = req.body;
  const user = req.session.user;
  console.log(user);

  let statusCode = 200;
  let msg = 'ssadfa';
  let view = 'login';

  if (user) {
    const id = userModel.lastIdTask(user) + 1;
    console.log(id);
    const task = {id, title, description, status: 0};
    user.tasks.push(task);
    msg = `Welcome, ${user.name}`;
    view = 'index';
    userModel.update(user, task);
    userModel.saveJSON(() => {
      console.log(user);
      req.session.user = user;
      res.status(200).render("index", {
        title: 'Home',
        message: "foioo"
      });
    });
  } else {
    statusCode = 401;
    msg = 'Email or password incorrects';
    view = 'users/login';
    res.status(404).render("404", {
        title: 'Not',
        message: "foioo"
      });
  }
};

exports.viewTask = (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const task = req.session.user.tasks.find(
    t => t.id === id
  );

  if (id) {
    console.log(task);
    res.status(200).render("viewTask", {
      task,
      title: 'Task'
    });
  } else {
    res.status(404).render("404", {
      title: "Recurso Inexistente"
    });
  }
};

exports.completeTask = (req, res) => {
  const id = req.params.id * 1;
  const user = req.session.user;
  console.log(id);
  const task = req.session.user.tasks.find(
    t => t.id === id
  );

  if (id) {
    userModel.completeTask(user, task);
    userModel.saveJSON(() => {
      req.session.user = user;
      res.status(200).render("index", {
        title: 'Home',
        message: "foioo"
      });
    });
  } else {
    res.status(404).render("404", {
      title: "Recurso Inexistente"
    });
  }
};
