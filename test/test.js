const { expect } = require('chai');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const apiKey = "XGInbe9tDInxVCv7fEqb8DbqT61nlskwQdjepciy";
const server = "https://divlahova.kanbanize.com/api/v2";


describe('Api tests...', () => {
  it('First get test...', (done) => {
    chai.request(server).get("/cards")
      .set("ApiKey", apiKey)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });
});

describe('Test_MoreThanOneCard...', () => {
  it('Verify that we have more than 1 cards...', (done) => {
    chai.request(server).get("/cards")
      .set("ApiKey", apiKey)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.a("object");
        done();
      })
  })
});

describe('Test_CreateNewCard...', () => {
  it('Create new card...', (done) => {
    let insert_data = {
      column_id: 1,
      lane_id: 1,
      title: "Test create new card",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.a("object");
        let index = res.body.data.length;
        expect(res.body.data[index - 1].column_id).to.equal(insert_data.column_id);
        expect(res.body.data[index - 1].lane_id).to.equal(insert_data.lane_id);
        expect(res.body.data[index - 1].title).to.equal(insert_data.title);
        expect(res.body.data[index - 1].position).to.equal(insert_data.position);
        done();
      })
  });
});

describe('Test_CreateNewCard_column_id...', () => {
  it('Create new card_empthy column_id ...', (done) => {
    let insert_data = {
      column_id: " ",
      lane_id: 1,
      title: "Test create new card",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      })
  }).timeout(10000);
});

describe('Test_CreateNewCard_invalid column_id...', () => {
  it('Create new card_invalid column_id assert ...', (done) => {
    let insert_data = {
      column_id: "@#$%",
      lane_id: 1,
      title: "Test create new card",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_empthy position...', () => {
  it('Create new card_empthy position ...', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: 1,
      title: "Test create new card",
      position: " "
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_invalid position...', () => {
  it('Create new card_invalid position assert ...', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: 1,
      title: "Test create new card",
      position: "#$%@^ "
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_empthy title...', () => {
  it('Create new card_empthy title ...', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: 1,
      title: " ",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_invalid title...', () => {
  it('Create new card_invalid title assert ...', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: 1,
      title: "#$%@^ ",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_empthy line_id...', () => {
  it('Create new card_empthy line_id ', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: " ",
      title: "Test create new card",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Test_CreateNewCard_invalid title...', () => {
  it('Create new card_invalid title assert ...', (done) => {
    let insert_data = {
      column_id: 15,
      lane_id: "#$%@^",
      title: "Test create new card",
      position: 5
    };
    chai.request(server)
      .post("/cards")
      .set("ApiKey", apiKey)
      .send(insert_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Change the card position...', () => {
  it('Change the card position', (done) => {
    let patch_data = {
      title: "Test Card, moving the position",
      position: 5
    };
    let pcard_id = 59;
    chai.request(server)
      .patch("/cards/" + pcard_id)
      .set("ApiKey", apiKey)
      .send(patch_data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.a("object");
        expect(res.body.data[0].title).to.equal(patch_data.title);
        expect(res.body.data[0].position).to.equal(patch_data.position);
        done();
      });
  });
});

describe('Change the card position_invalid position...', () => {
  it('Change the card  whit invalid position symbol...', (done) => {
    let patch_data = {
      title: "Test Card, moving the position whit invalid symbol",
      position: "@%&*"
    };
    let pcard_id = 38;
    chai.request(server)
      .patch("/cards/" + pcard_id)
      .set("ApiKey", apiKey)
      .send(patch_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Change the card position_emphty symbols...', () => {
  it('Change the card position whit emphty symbols...', (done) => {
    let patch_data = {
      title: " ",
      position: " "
    };
    let pcard_id = 63;
    chai.request(server)
      .patch("/cards/" + pcard_id)
      .set("ApiKey", apiKey)
      .send(patch_data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Delete card...', () => {
  it('Delete card ...', (done) => {
    chai.request(server)
      .delete("/cards/111")
      .set("ApiKey", apiKey)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe('Check deleted card...', () => {
  it('Check deleted card...', (done) => {
    chai.request(server)
      .get("/cards/111")
      .set("ApiKey", apiKey)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
