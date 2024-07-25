//Modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const { error } = require("console");
//Add modules there <==

//Port for server
const PORT = 3030;

//Types:
const setTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
  //Add types there <==
};

//Functions:
fileView = (response, isPath, ext) => {
  console.log("function start")
  response.setHeader("Content-Type", setTypes[ext]);
  console.log(`app/public${isPath}`)
  fs.readFile(`app/public${isPath}`, (error, data) => {
    if (error) {response.end()}
    response.end(data)
  })
};

//Main block
http
  .createServer(function (request, response) {
    //Reqests
    const url = request.url;

    //Route
    switch (url) {
      //List of routes
      case "/":
        console.log(url)
        fileView(response, "/index.html", ".html")
        break;
      //Add more routes there <==
      default:
        const extName = String(path.extname(url)).toLocaleLowerCase();
        if (extName in setTypes) {
          fileView(response, url, extName)
        } else {
          response.end()
        }
    }
  })
  .listen(PORT);
