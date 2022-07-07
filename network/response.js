exports.success = (req, res, message, status) => {
  return res.status(status || 200).send({
    error: "",
    body: message,
  });
};

exports.error = (req, res, message, status, errorDetails) => {
  console.error("[Response error] " + errorDetails);
  return res.status(status || 500).send({
    error: message,
    body: "",
  });
};
