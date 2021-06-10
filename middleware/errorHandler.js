const errorHandler = (err, req, res, next) => {
  console.log("NAME: " + err.name);
  console.log("CODE: " + err.code);
  console.log("MESSAGE: " + err.message);
  console.log("STACK TRACE: " + err.stack);
  res.status(500).send({ error: err });
};

module.exports = errorHandler;
