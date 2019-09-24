const session = require('express-session');
const userModel = require('../models/userModel');
//const cardapioModel = require('../models/cardapioModel');

exports.startSession = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});

exports.copySessionForViews = (req, res, next) => {
  res.locals.session = req.session;
  next();
};

exports.protect = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('users/login');
  }
  res.locals.session = req.session;
  next();
};

exports.login = (req, res) => {
  res.status(200).render('users/login', {
    title: 'Login'
  });
};

exports.validateLogin = (req, res) => {
  const { email, password } = req.body;

  let statusCode = 200;
  let msg;
  let view;

  const user = userModel.users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    msg = `Welcome, ${user.name}`;
    view = 'index';
    req.session.user = user;
  } else {
    statusCode = 401;
    msg = 'Email or password incorrects';
    view = 'users/login';
  }
  
  res.status(statusCode).render(view, {
    title: 'Home',
    message: msg,
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.register = (req, res) => {
  res.status(200).render('users/register', {
    title: 'Register',
    users: {}
  });
};

exports.validateRegister = (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const errors = userModel.validate(
    name,
    email,
    password,
    passwordConfirmation
  );

  if (!errors.isErrors()) {
    const id = userModel.lastId() + 1;
    const user = { id, name, email, password };
    userModel.users.push(users);
    req.session.users = users;
    userModel.saveJSON(() => {
      res.status(200).render('index', {
        user,
        msg: `Usuário ${user.name} registrado com sucesso.`
      });
    });
  } else {
    const userView = { name, email };
    res.status(401).render('users/register', {
      user: userView,
      errors
    });
  }
};