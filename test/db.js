const should = require('should');

const db = require('../db');

describe('# insert', () => {
  it('should insert without errors', (done) => {
    const qry = 'INSERT INTO questions VALUES' +
      `(NULL, 'test', 'test', 'A', now())`;
    db.query(qry, (err) => {
      (err == null).should.be.true;
    });
    done();
  });
});
