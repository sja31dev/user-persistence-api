process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const User = require('../controllers/models/user');

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => { // Empty the database before each test
    User.remove({}, (err) => {
      done();
    });
  });

  // Test get all
  describe('/GET user', () => {
    it('it should Get all the users', (done) => {
      chai.request(server)
          .get('/api/user')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should not POST a user without email field', (done) => {
      const user = {
        "forename": "John",
        "surname": "Smith"
      };
      chai.request(server)
          .post('/api/user')
          .send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('email');
            res.body.errors.email.should.have.property('kind').eql('required');
            done();
          });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should not POST a user without forename field', (done) => {
      const user =
      {
        "email": "john@smith.com",
        "surname": "Smith"
      };
      chai.request(server)
          .post('/api/user')
          .send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('forename');
            res.body.errors.forename.should.have.property('kind').eql('required');
            done();
          });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should not POST a user without surname field', (done) => {
      const user = {
        "email": "john@smith.com",
        "forename": "John"
      };
      chai.request(server)
          .post('/api/user')
          .send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('surname');
            res.body.errors.surname.should.have.property('kind').eql('required');
            done();
          });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should not POST a user with invalid email field', (done) => {
      const user = {
        "email": "Invalid email address",
        "forename": "John",
        "surname": "Smith"
      };
      chai.request(server)
          .post('/api/user')
          .send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Invalid email address');
            done();
          });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should not POST a user with same email as existing user', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
        chai.request(server)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error').eql('User with that email address already exisis');
              done();
        });
      });
    });
  });

  // Test post
  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      const user = {
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      };
      chai.request(server)
          .post('/api/user')
          .send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('email');
            res.body.should.have.property('forename');
            res.body.should.have.property('surname');
            res.body.should.have.property('created');
            done();
          });
    });
  });

  // Test get id
  describe('/GET/?id user', () => {
    it('it should GET a user given the id', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
        chai.request(server)
            .get('/api/user/?id=' + user.id)
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('email');
              res.body.should.have.property('forename');
              res.body.should.have.property('surname');
              res.body.should.have.property('created');
              res.body.should.have.property('id').eql(user.id);
              done();
        });
      });
    });
  });

  // Test get email
  describe('/GET/?email user', () => {
    it('it should GET a user given the email', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
        chai.request(server)
            .get('/api/user/?email=' + user.email)
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('forename');
              res.body.should.have.property('surname');
              res.body.should.have.property('created');
              res.body.should.have.property('email').eql(user.email);;
              done();
        });
      });
    });
  });

  // Test get email
  describe('/GET/?email user', () => {
    it('it should not GET a user given the email with invalid email address', (done) => {
      let user = new User({
        "email": "Invalid email address",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
        chai.request(server)
            .get('/api/user/?email=' + user.email)
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('error').eql('Invalid email address');
              done();
        });
      });
    });
  });

  // Test update user
  describe('/PUT/?id user', () => {
    it('it should UPDATE a user given the id', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
          chai.request(server)
              .put('/api/user/?id=' + user.id)
              .send({"email":"john@smith.co.uk"})
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email').eql("john@smith.co.uk");
                done();
          });
      });
    });
  });

  // Test update user
  describe('/PUT/?id user', () => {
    it('it should not UPDATE a user given the id if the email address is invalid', (done) => {
      let user = new User({
        "email": "john@smith.co.uk",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
          chai.request(server)
              .put('/api/user/?id=' + user.id)
              .send({"email":"Invalid email address"})
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Invalid email address');
                done();
          });
      });
    });
  });

  // Test update user
  describe('/PUT/?id user', () => {
    it('it should not UPDATE a user given the id if the new email address already exists', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      let user2 = new User({
        "email": "john.smith@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user2.save();
      user.save((err, user) => {
          chai.request(server)
              .put('/api/user/?id=' + user.id)
              .send({"email":"john.smith@smith.com"})
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('User with that email address already exisis');
                done();
          });
      });
    });
  });

  // Test delete user
  describe('/DELETE/?id user', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({
        "email": "john@smith.com",
        "forename": "John",
        "surname": "Smith"
      });
      user.save((err, user) => {
          chai.request(server)
              .delete('/api/user/?id=' + user.id)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("User deleted");
                done();
          });
      });
    });
  });

});
