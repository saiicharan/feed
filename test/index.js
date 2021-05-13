var chai  = require('chai');
var chaiHttp = require('chai-http');
const { response } = require('express');
var mainServer = require('../index.js');

chai.should();
chai.use(chaiHttp);

describe('Test running: ', ()=> {
    it('Test call: Should return 200', (done) => {
        chai.request(mainServer)
            .get("/ping")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    });
})