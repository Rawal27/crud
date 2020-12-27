module.exports = (app) => {
	const users = require('../controllers/user.controller.js');

	app.post('/user', users.create);

	app.get('/users', users.findAll);

	app.get('/users/:userId', users.findOne);

	app.put('/users/:userId', users.update);

	app.delete('/users/:userId', users.delete);

	app.post('/users/:userId/wallet', users.createWallet);

	app.post('/users/:userId/wallet/:walletId', users.addBalance);

	app.post('/users/:userId/wallet/:walletId', users.deductBalance);
}
