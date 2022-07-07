const db = require("mongoose");

db.Promise = global.Promise;

async function connectMongoDb(uri) {
  await db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("[db.Mongo] Conectada con éxito"))
    .catch((err) => console.error("[db.Mongo]", err.message));
}

module.exports = { connectMongoDb }
