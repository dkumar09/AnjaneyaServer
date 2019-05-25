var http = require("http");
var url = require('url'); //used to parse url. required for checking whether to upload file or return an image 
var fs = require('fs'); //required for file system. used for saving a file
var fs2 = require('fs');
var form1 = require('formidable'); //used for parsing form and acessing form element.
var rs1 = fs.createReadStream('./form.html'); //read file form.html
var d = require('date-and-time'); //used for acessing system dateand time
var sql = require("./sql");
var db = new sql.sql();




//creates a httpserver on port 8089
http.createServer(function (request, response) {

  var q = url.parse(request.url, true);
  console.log(q.pathname);
  if (q.pathname == '/') { // checks whether post data exist or not
    response.end('no file selected');
  }

 
 
 
 
 
  else if (request.url == "/fileupload") { //if exist then uploaded data is parsed
    var form = new form1.IncomingForm(); //creates new form element
    form.parse(request, function (err, fields, files) {
      var fold = fields.key; //fold contains key ie the name of user.
      //var mail = fields.mail;
      if (!fs.existsSync('c:cd/' + fold)) { //checks whether folder exist or not
        fs.mkdirSync('c:cd/' + fold); //creates folder if it does not existnp
      }

      var old = files.filetoupload.path;
      var now = new Date();
      asd = d.format(now, 'MM_DD_YYYY_HH_mm_ss_SSS'); // storjes current date at the ime of upload.
      var newp = "c:/cd/" + fold + '/' + asd + ".jpeg"; //crees file in the user folder
      fs.rename(old, newp, function (err) {
        if (err) {
          response.writeHead(404, {
            'Content-Type': 'text/html'
          });
          response.end("file is not selected")
        };
        response.end("localhost:8089/" + fold + '/' + asd + '.jpeg'); //returns link of imagefle stored
      });
    })
  } 
  
  
  
  
  
  else if (request.url == '/form.html') //handles form
  {
    var filename = "./form.html";

    fs.readFile(filename, function (err, data) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/html'
        });
        return response.end("404! Not Found");
      }
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write("<title>Uploaded</title>");
      response.write(data);
      return response.end();
    })
  }
  
  
  
  else if (request.url == '/user.html') //handles form
  {
    var filename = "./user.html";

    fs.readFile(filename, function (err, data) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/html'
        });
        return response.end("404! Not Found");
      }
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write("<title>Uploaded</title>");
      response.write(data);
      return response.end();
    })
  } 






  else if (request.url == '/newuser') //handles NewUSer for mysql
  {
    function response(res) {
      console.log(res);
    }
    var form = new form1.IncomingForm(); //creates new form element
    form.parse(request, function (err, fields, files) {
      var name = fields.name;
      var phone = fields.phone;
      var sex = fields.sex;
      var uid = parseInt(fields.uid, 10);
      task = 'INSERT INTO users VALUES ("' + name + '","' + phone + '","' + sex + '",' + uid + ')';
      db.query(task, response);
    });

  } 
  
  
  
  
  
  else {
    var fname = q.pathname; //handles image request
    if (fs2.existsSync('c:/cd/' + fname)) {
      var img = fs2.readFileSync('c:/cd/' + fname);
      response.writeHead(200, {
        'Content-Type': 'image/jpg'
      });
      response.end(img);
    } else { //handles empty files
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end('no such file found');
    }

  }
}).listen(8089); //listens to port 8089