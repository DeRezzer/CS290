/*
 * Write your server code in this file.
 *
 * name: Martin Escoto
 * email: escotom@oregonstate.edu
 */
 
 //will read in the environment variable if you choose to set one
 //this will be the port that is used later on when firing up the server
 var PORT = process.env.PORT;

//if the PORT is not set as a env variable, meaning, one is not specified
//the default PORT will be 3000
if(!process.env.PORT){
    PORT = 3000;
}

 //our variables that need to be required from NODE that will be used through he server: HTTP, URL, and FS
 var http = require('http');
 var url = require('url');
 var fs = require('fs');

 //variables to read-in/cache our data from the necessary files
 var htmlFile;
 var cssFile;
 var jsFile;
 var errFile;

//read-in/cache our data from the HTML file, else ERROR will be thrown
 fs.readFile('./public/index.html', function(err, data){
     if(err){
         throw err;
     }
     console.log("html was cached!");
     htmlFile = data;
 });

 //read-in/cache our data from the CSS file, else ERROR will be thrown
 fs.readFile('./public/style.css', function(err, data){
     if(err){
         throw err;
     }
     console.log("css was cached!");
     cssFile = data;
 });

//read-in/cache our data from the JS file, else ERROR will be thrown
 fs.readFile('./public/index.js', function(err, data){
    if(err){
        throw err;
    }
    console.log("js was cached!");
    jsFile = data;
 });

 //read-in/cache our data from the 404 HTML file, else ERROR will be thrown
 fs.readFile('./public/404.html', function(err, data){
    if(err){
        throw err;
    }
    console.log("404 was cached!");
    errFile = data;
 });

 //function to handle our our requests from the server
 //it is passed into our createServer functin down below
 //will trigger when browser requests files/data that referenced in HTML
 function handleRequest(request, response){
     //console.log("== Request recieved");

     //switch to be able to respond with the requested data
     switch(request.url){
         //trigger when CSS is requested
         case "/style.css" : response.writeHead(200, {"Content-Type": "text/css"});
         response.write(cssFile);
         break;

         //trigger when JS is requested
         case "/index.js" : response.writeHead(200, {"Content-Type": "text/js"});
         response.write(jsFile);
         break;

         //trigger when index HTML is requested
         case "/index.html" : response.writeHead(200, {"Content-Type": "text/html"});
         response.write(htmlFile);
         break;

         //trigger when path is not specified, default to index HTML
         case '/' : response.writeHead(200, {"Content-Type": "text/html"});
         response.write(htmlFile);
         break;

         //trigger when path not in SWITCH
         default : response.writeHead(404, {"Content-Type": "text/html"});
         response.write(errFile);
     }
     response.end();
 }

 //creates our server object
 var server = http.createServer(handleRequest);

 //function to fire up server, pass in PORT
 //simple message to inform us server is listening and which PORT is being used
 server.listen(PORT, function(){
    console.log("== Server is listening on port:", PORT);
 });

//console.log("hello world!");