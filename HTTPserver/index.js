const express = require("express");
const app = express();

app.get("/multiply", function (req, res) {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  res.json({
    answer: a * b,
  });
});

app.get("/add", function (req, res) {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  res.json({
    answer: a + b,
  });
});

app.get("/add/:firstArg/:secondArg", function (req, res) {
    const a = parseInt(req.params.firstArg)
    const b = parseInt(req.params.secondArg)
  res.json({
    answer: a + b,
  });
});

app.get("/divide", function (req, res) {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
  res.json({
    answer: a / b,
  });
});

app.get("/subtract", function (req, res) {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  res.json({
    answer: a - b,
  });
});

app.listen(3000);
