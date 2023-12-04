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
    var user = request.body.user;
    var pass = request.body.pass;
    var connection = mysql.createConnection(credentials);
    var statement = `select * from auth where user = '${user}' and pass = '${pass}';`
    console.log(statement);
    connection.query(statement , (error , result)=>{
        if(error == null && result.length>0)
        {
            
            var objForToken = {
                u : user,
                p : pass,
                key : "1234"
            }
            var t = jwt.sign(objForToken , "252525")
            var objToSend = {
                status : "success",
                token : t
            }
            connection.end()
            response.send(objToSend);
        
        }
        else{
            var objToSend = {
                status : "Fail"
            }
            connection.end()
            response.send(objToSend);
        }
    })
})


module.exports = app;
