let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("#Users Network.js: ", () => {
  let userId;

  it("POST /user    create user status 200", (done) => {
    chai
      .request(url)
      .post("/user/")
      .send({
        name: "trevol",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body._id).to.exist;
        userId = res.body.body._id ?? null;
        done();
      });
  });

  it("POST /user    create user status 500", (done) => {
    chai
      .request(url)
      .post("/user/")
      .send({
        name: ""
      })
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal("Error en base de datos");
        expect(res.body.body).to.be.equal("");
        done();
      });
  });

  it("PATCH /user    Modify user's name status 200", (done) => {
    chai
      .request(url)
      .patch("/user/")
      .send({
        name: "mochuelo46",
        userId: userId,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body.modifiedCount).to.be.equal(1);
        done();
      });
  });

  it("GET /user    Get users status 200", (done) => {
    chai
      .request(url)
      .get("/user/")
      .send({ name: "mochuelo46", userId: "" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        done();
      });
  });

  it("GET /user    Get user by id status 200", (done) => {
    chai
      .request(url)
      .get("/user/")
      .send({ userId: userId, name: "" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body).to.be.an("array");
        expect(res.body.body[0].name).to.be.equal("mochuelo46");
        done();
      });
  });

  it("GET /user    Get users status 500", (done) => {
    chai
      .request(url)
      .get("/user/")
      .send({})
      .end(function (err, res) {
        expect(res).to.have.status(500);
        expect(res.body.error).to.be.equal("Error al obtener usuarios");
        expect(res.body.body).to.be.equal("");
        done();
      });
  });

  it("DELETE /user    delete user status 200", (done) => {
    chai
      .request(url)
      .delete("/user/")
      .send({
        userId: userId,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.equal("");
        expect(res.body.body.deletedCount).to.be.equal(1);
        done();
      });
  });

  it("DELETE /user    delete user status 500", (done) => {
    chai
      .request(url)
      .delete("/user/")
      .send({
        userId: "",
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
