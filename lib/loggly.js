var loggly = require('loggly');

/*var client = loggly.createClient({
  token: "1cae3802-0bfb-4462-8b6f-4697c794867c",
  subdomain: "edwinacevedo",
  tags: ["NodeJS"],
  json: true
});*/
function logger (tag) {
  return  loggly.createClient({
  token: "1cae3802-0bfb-4462-8b6f-4697c794867c",
  subdomain: "edwinacevedo",
tags      : ['NodeJS', tag],
  json: true
});
    return client;
}
/*client.log("Hello World from Node.js!");*/ //logs this to loggly


module.exports = logger;
