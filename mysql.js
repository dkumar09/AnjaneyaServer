var mysql = require('mysql')
var sql = function sql() {
    this.connection = mysql.createConnection({
        host: "localhost",
        user: "god",
        password: "good",
        database:"users"
    });
    connection.connect(function(err){
        if(err){
            throw err;
            console.log("connected to mysql successfully");
        }
        console.log("connected to mysql successfully");
        

    });
}
module.exports.sql = sql;