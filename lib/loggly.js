var loggly = require('loggly');

/*var client = loggly.createClient({
  token: "1cae3802-0bfb-4462-8b6f-4697c794867c",
  subdomain: "edwinacevedo",
  tags: ["NodeJS"],
  json: true
});*/

// we can use loggly's api to send logs from multiple servers to loggly,
// which assembles these into a comprehensible whole
function logger(tag) {
    return loggly.createClient({
      token: "process.env.LOGGLY_TOKEN",
      subdomain: "edwinacevedo",
      tags: ['NodeJS', tag],
      json: true
    });
    return client;
  }
  /*client.log("Hello World from Node.js!");*/ //logs this to loggly


module.exports = logger;
