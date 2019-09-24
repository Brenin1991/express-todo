const express = require('express');
const path = require('path');
//const usuarioRouter = require("./routes/usersRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const authenticationController = require("./controllers/authenticationController");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticationController.startSession);
app.use(authenticationController.copySessionForViews);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

////////////////////////////////////////////////////

app.use("/", authenticationRoutes);
//app.use("/usuarios", userRouter);

app.get('/', (req, res) => {
	res.status(200).render('index', {
		title: 'Home'
	});
});

app.all('*', (req, res) => {
	res.status(404).render('404', {
		title: 'Recurso Inexistente'
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(
		`Servidor rodando em http://localhost:${port} ...`
	);
});
