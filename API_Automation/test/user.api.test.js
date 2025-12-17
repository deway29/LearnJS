const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const BASE_URL = 'https://belajar-bareng.onrender.com';
let TOKEN; // token hasil login

describe('Belajar Bareng API Automation', () => {

  /**
   * LOGIN - POSITIVE
   */
  it('POST - Login (Positive)', (done) => {
    chai.request(BASE_URL)
      .post('/api/login')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');

        TOKEN = res.body.token; // simpan token
        done();
      });
  });

  /**
   * GET USERS
   */
  it('GET - Get all users', (done) => {
    chai.request(BASE_URL)
      .get('/api/users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res).to.have.status(200);

        // response object
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status', 200);
        expect(res.body).to.have.property('users');
        expect(res.body.users).to.be.an('array');

        // validasi isi array
        if (res.body.users.length > 0) {
          expect(res.body.users[0]).to.have.property('userId');
          expect(res.body.users[0]).to.have.property('username');
          expect(res.body.users[0]).to.have.property('age');
          //expect(res.body.users[0]).to.not.have.property('protected');
        }

        done();
      });
  });

  /**
   * POST ADD USER - POSITIVE
   */
  it('POST - Add user (Positive)', (done) => {
    chai.request(BASE_URL)
      .post('/api/add-user')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({
        username: 'TestedAuto6',
        age: 25
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('username');
        done();
      });
  });

  /**
   * POST ADD USER - NEGATIVE (TANPA USERNAME)
   */
  it('POST - Add user (Negative - without username)', (done) => {
    chai.request(BASE_URL)
      .post('/api/add-user')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({
        age: 20
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  /**
   * POST ADD USER - NEGATIVE (TANPA AGE)
   */
  it('POST - Add user (Negative - without age)', (done) => {
    chai.request(BASE_URL)
      .post('/api/add-user')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({
        username: 'TestedAuto_NoAge'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  /**
 * POST ADD USER - NEGATIVE (AGE < 0)
 */
it('POST - Add user (Negative - age below 0)', (done) => {
  chai.request(BASE_URL)
    .post('/api/add-user')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({
      username: `TestedAuto_NegAge_${Date.now()}`,
      age: -1
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Age cannot be negative.');
      done();
    });
});

});
