var sql = require("./sql");
var deep = new sql.sql();
var c = null;
function response(res){
    console.log(res[0].name);
}
task = "select * from Users";
deep.query(task,response);
