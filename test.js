let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');
let should = chai.should();

let mongoose = require("mongoose");
let User = require('./models/user.model.js');




chai.use(chaiHttp);
describe('users', () => {
        describe('/GET users', () => {
                it('it should GET all the users', (done) => {
                        chai.request(server)
                        .get('/users')
                        .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('array');
                                done();
                        });
                });
        });

	describe('/POST user', () => {
		it('it should POST a user', (done) => {
			let user = {
				name: "Testing 2",
				description: "vcvsfvsfsfvsv"
			}

			chai.request(server)
				.post('/user')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('description');
					res.body.should.have.property('message').eql('User successfully added!');
				done();
				});
		});
	});
	
	describe('/PUT/:userId user', () => {
		it('it should UPDATE a user given the id', (done) => {
			let user = new User({
				name: "MR Bean1",
				description: "Mr funny Bones with Doctorate1"
			});
			user.save((err, user) => {
				chai.request(server)
				.put('/users/' + user.id)
				.send({
					name: "MS Kidney Bean",
					description: "Sister of MR Bean is actually a doctor"
				}) 
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('User updated successfully!');
					res.body.data.should.have.property('name').eql('MS Kidney Bean');
				done();
				});
			});

		});		
	});

	describe('/DELETE/:userid user', () => {
      		it('it should DELETE a user given the id', (done) => {
          		let user = new User({name: "Tony Stark", description: "CEO of Stark Industries"})
          		user.save((err, user) => {
                		chai.request(server)
                		.delete('/users/' + user.id)
                		.end((err, res) => {
                      			res.should.have.status(200);
                      			res.body.should.be.a('object');
                      			res.body.should.have.property('message').eql('User deleted successfully!');
                  		done();
                		});
          		});
      		});
  	});

});

