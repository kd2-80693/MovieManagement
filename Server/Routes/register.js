var express = require('express')
var app = express.Router();
var mysql = require('mysql2')
var jwt = require('jsonwebtoken')


var credentials = {
    host: "localhost",
    database: "abc",
    user: "abc",
    password: "abc"
}


app.post("/" , (request , response)=>
{
    var fname = request.body.fnam;
    var lname = request.body.lnam;
    var user = request.body.user;
    var pass = request.body.pass;
    var mobile = request.body.mob;
    var dob = request.body.date;
    console.log(dob);

    var connection = mysql.createConnection(credentials);
    var statement = `insert into auth values("${fname}" , "${lname}" , "${mobile}" , "${dob}" , "${user}" , "${pass}");`
    console.log(statement);

    connection.query(statement , (error , result)=>{
        if(error == null && result.affectedRows>0)
        {
            var objToSend = {
                status : "success" 
            }
            console.log("succ")
            connection.end()
            response.send(objToSend);
        
        }
        else{
            var objToSend = {
                status : "Fail"
            }
            console.log("fail")
            connection.end()
            response.send(objToSend);
        }
    })
})


module.exports = app;
