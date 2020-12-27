const User = require('../models/user.model.js');

exports.create = (req, res) => {
   	if(!req.body.description){
		return res.status(400).send({
			message: "User description can't be empty"
		});
	}

	const user = new User({
		name: req.body.name || "Unnamed User",
		description: req.body.description
	});

	user.save()
	.then(data => {
		res.send({
			message: "User successfully added!",
			data: data
		});
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating a User."
		});
	});
};

exports.findAll = (req, res) => {
	User.find()
	.then(users => {
		res.send(users);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving Users."
		});
	});
};

exports.findOne = (req, res) => {
	User.findById(req.params.userId)
	.then(user => {
		if(!user){
			return res.status(404).send({
				message: "User cannot be found with id " + req.params.userId 
			});
		}
		res.send(user);
	}).catch(err => {
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: "User not found with id " + req.params.userId
			});
		}
		return res.status(500).send({
			message: "Error retrieving user with id " + req.params.userId
		});
	});
};

exports.update = (req, res) => {
	if(!req.body.name){
		return res.status(400).send({
			message: "User name cannot be empty"
		});
	}

	User.findByIdAndUpdate(req.params.userId, {
		name: req.body.name || "Unnamed User",
		description: req.body.description
	}, {new: true})
	.then(user => {
		if(!user){
			return res.status(404).send({
				message: "User not found with id " + req.params.userId
			});
		}
		res.send({
			data: user,
			message: "User updated successfully!"
		});
	}).catch(err => {
		if(err.kind == 'ObjectId'){
			return res.status(404).send({
				message: "User not found with id " + req.params.userId 
			});
		}
		return res.status(500).send({
			message: "Error updating user with id " + req.params.userId
		});
	});
};

exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
	.then(user => {
		if(!user){
			return res.status(404).send({
				message: "User not found with id " + req.params.userId
			});
		}
		res.send({ message: "User deleted successfully!" });
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'Not Found'){
			return res.status(404).send({
				message: "User not found with id " + req.params.userId
			});		
		}
		return res.status(500).send({
			message: "Could not delete user with id " + req.params.userId
		});
	});
};

exports.createWallet = (req, res) => {

};

exports.addBalance = (req, res) => {

};

exports.deductBalance = (req, res) => {

};































