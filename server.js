var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

//sends listingData JSON if /listings is accessed, otherwise it sends a 404 message
var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
   if (request.method == "GET" && parsedUrl.pathname == "/listings") {
     console.log("listings");
     response.writeHead(200, {'Content-Type': 'text/plain'});
     response.end(listingData);
   } else {
     response.writeHead(404, {"Content-Type": "text/plain"});
     response.write("Bad gateway error");
     response.end();
   }
};

//Saves the data into listingData and starts the server at port 8080 (http://localhost:8080)
fs.readFile('listings.json', 'utf8', function(err, data) {
   listingData = data
   http.createServer(requestHandler).listen(8080);
});
