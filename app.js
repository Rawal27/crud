const express = require('express');
const bodyParser = require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())



const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => {
	console.log("Connected to database successfully!!");
}).catch(err => {
	console.log('Cannot to connect to database.', err);
	process.exit();
});

app.get('/', (req, res) => {
	res.json({ "message": "Welcome to CRUD application. This includes unit testing as well."});	
});

require('./routes/user.routes.js')(app);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});

module.exports = app;









