var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
  user: "god",
  password: "god",
  database: "users"
})
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected! to MYsql");
    var sql = "CREATE TABLE customers (name VARCHAR(255), phoneno VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });