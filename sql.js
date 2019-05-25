var mysql = require('mysql')
var sql = function sql() {
    this.connection = mysql.createConnection({
        host: "localhost",
        user: "god",
        password: "good",
        database:"anjaneyausers"
    });
    this.connection.connect(function(err){
        if(err){
            throw err;
            console.log("connected to mysql successfully");
        }
        console.log("connected to mysql successfully");
    });
    this.query = function(task,callback) {
       
    this.connection.query(task,function(err,response){
            if(err) throw err;
            callback(response);
        })
    }
}
module.exports.sql = sql;