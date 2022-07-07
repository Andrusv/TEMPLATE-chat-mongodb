let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("#Messages Network.js: ", () => {
  let messageId;

  it("POST /message    send message status 200", (done) => {
    chai
      .request(url)
      .post("/message/")
      .send({
        message: "Testing sending message",
        user: "62c4cefabffa59e9f2bcaf51",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body._id).to.exist;
        messageId = res.body.body._id ?? null;
        done();
      });
  });

  it("POST /message    send message status 500", (done) => {
    chai
      .request(url)
      .post("/message/")
      .send({
        message: "",
        user: "",
      })
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal("Error en base de datos");
        expect(res.body.body).to.be.equal("");
        done();
      });
  });

  it("PATCH /message    Modify user's message status 200", (done) => {
    chai
      .request(url)
      .patch("/message/")
      .send({
        message: "message changed",
        messageId: messageId,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body.modifiedCount).to.be.equal(1);
        done();
      });
  });

  it("GET /message    Get user messages status 200", (done) => {
    chai
      .request(url)
      .get("/message/")
      .send({ user: "62c4cefabffa59e9f2bcaf51", messageId: "" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        done();
      });
  });

  it("GET /message    Get user message by id status 200", (done) => {
    chai
      .request(url)
      .get("/message/")
      .send({ messageId: messageId, user: "" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        expect(res.body.body[0].message).to.be.equal("message changed");
        done();
      });
  });

  it("GET /message    Get user messages status 500", (done) => {
    chai
      .request(url)
      .get("/message/")
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal("Error al obtener mensajes");
        expect(res.body.body).to.be.equal("");
        done();
      });
  });

  it("DELETE /message    delete message status 200", (done) => {
    chai
      .request(url)
      .delete("/message/")
      .send({
        messageId: messageId,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body.deletedCount).to.be.equal(1);
        done();
      });
  });

  it("DELETE /message    delete message status 500", (done) => {
    chai
      .request(url)
      .delete("/message/")
      .send({
        messageId: "",
      })
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal(
          "Error borrando elemento en base de datos"
        );
        expect(res.body.body).to.be.equal("");
        done();
      });
  });
});
