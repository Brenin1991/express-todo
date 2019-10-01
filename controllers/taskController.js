const session = require('express-session');
const userModel = require('../models/userModel');

exports.addTask = (req, res) => {
  res.status(200).render('users/addTask', {
    title: 'Add Task',
    user: {}
  });
};

exports.validateTask = (req, res) => {
  const { title, description } = req.body;
  const user = req.session.user;
  
  if (user) {
    const id = userModel.lastIdTask(user) + 1;
    const task = { id, title, description, status: 0 };

    user.tasks.push(task);

    userModel.update(user, task);

    userModel.saveJSON(() => {
      req.session.user = user;
      res.status(200).render('index', {
        title: 'Home',
        message: 'Sucess'
      });
    });
  } else {
    res.status(404).render('404', {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

exports.viewTask = (req, res) => {
  const id = req.params.id * 1;

  const task = req.session.user.tasks.find(
    t => t.id === id
  );

  if (id) {
    res.status(200).render('viewTask', {
      task,
      title: `${task.title}`
    });
  } else {
    res.status(404).render("404", {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

exports.completeTask = (req, res) => {
  const id = req.params.id * 1;
  const user = req.session.user;

  const task = req.session.user.tasks.find(
    t => t.id === id
  );

  if (task) {
    userModel.completeTask(task, user);

    userModel.saveJSON(() => {
      req.session.user = userModel.users.find(
        u => u.id === user.id
      );
      res.status(200).render('index', {
        user,
        title: 'Home',
        message: 'Sucess'
      });
    });
  } else {
    res.status(404).render("404", {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

exports.updateTask = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).render('users/editTask', {
    id
  });
};

exports.validateUpdate = (req, res) => {
  const { id, title, description } = req.body;
  const idTask = id * 1;
  const user = req.session.user;

  const task = user.tasks.find(
    t => t.id === idTask
  );

  userModel.updateTask(task, user, title, description);
  if (task) {
    userModel.saveJSON(() => {
      req.session.user = userModel.users.find(
        u => u.id === user.id
      );
      res.status(200).render('index', {
        user,
        title: 'Home',
        message: 'Sucess'
      });
    });
    console.log(task);
  } else {
    res.status(404).render('404', {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

exports.deleteTask = (req, res) => {
  const id = req.params.id * 1;
  const user = req.session.user;

  const task = req.session.user.tasks.find(
    t => t.id === id
  );

  if (task) {
    userModel.deleteTask(task, user);

    userModel.saveJSON(() => {
      req.session.user = userModel.users.find(
        u => u.id === user.id
      );
      res.status(200).render('index', {
        task,
        title: 'Home',
        message: 'Sucess'
      });
    });
  } else {
    res.status(404).render('404', {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

exports.clearTasks = (req, res) => {
  const user = req.session.user;

  if (user) {
    userModel.clearTasks(user);

    userModel.saveJSON(() => {
      req.session.user = userModel.users.find(
        u => u.id === user.id
      );
      res.status(200).render('index', {
        title: 'Home',
        message: 'Sucess'
      });
    });
  } else {
    res.status(404).render('404', {
      title: 'Nonexistent Feature',
      message: 'Nonexistent Feature'
    });
  }
};

