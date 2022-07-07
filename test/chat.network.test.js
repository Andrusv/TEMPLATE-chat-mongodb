let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("#Chats Network.js: ", () => {
  let chatId;

  it("POST /chat    create chat status 200", (done) => {
    chai
      .request(url)
      .post("/chat/")
      .send({
        users: ["62c4e1106f7bfadbe00ca1d3", "62c4cefabffa59e9f2bcaf51"],
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body._id).to.exist;
        chatId = res.body.body._id ?? null;
        done();
      });
  });

  it("POST /chat    create chat status 500", (done) => {
    chai
      .request(url)
      .post("/chat/")
      .send({
        name: "",
      })
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal("Error en base de datos");
        expect(res.body.body).to.be.equal("");
        done();
      });
  });

  it("GET /chat    Get chats by user id status 200", (done) => {
    chai
      .request(url)
      .get("/chat/")
      .send({ users: "62c4e1106f7bfadbe00ca1d3" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        expect(res.body.body[0]._id).to.be.equal(chatId);
        done();
      });
  });

  it("GET /chat    Get chat status 200", (done) => {
    chai
      .request(url)
      .get("/chat/")
      .send({ })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        expect(res.body.body[0]._id).to.be.equal(chatId);
        done();
      });
  });

  it("DELETE /chat    delete chat status 200", (done) => {
    chai
      .request(url)
      .delete("/chat/")
      .send({
        chatId: chatId,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body.deletedCount).to.be.equal(1);
        done();
      });
  });

  it("DELETE /chat    delete chat status 500", (done) => {
    chai
      .request(url)
      .delete("/chat/")
      .send({
        chatId: "",
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
