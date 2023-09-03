const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event log is blocked
  }
}

app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  //[5,1,2,3,4].sort()
  res.send(`performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`ding ding ding! ${process.pid}`);
});

console.log("Running server.js");
if (cluster.isMaster) {
  console.log("Master has been started");
  const NUM_WORKERS = os.cpus().length;
  console.log('NUM_WORKERS', NUM_WORKERS)

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("worker process started");
  app.listen(9000);
}
