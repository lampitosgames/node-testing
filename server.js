//Include the http module that ships with node
var http = require("http");
var url = require("url");

//Start the server
function start(route, handle) {
  http.createServer(function(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      //called when a new chunk of data was received
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      //called when all chunks of data have been received
      route(handle, pathname, response, postData);
    });
  }).listen(8888);

  console.log("Server has started");
}

//Old way of exporting.  Probably different in ES6
exports.start = start;
