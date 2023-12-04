var express = require('express')
var app = express.Router();

var mysql = require('mysql2')
var credentials = {
    host: "localhost",
    database: "abc",
    user: "abc",
    password: "abc"
}


app.get('/', (request, response) => {
    var connection = mysql.createConnection(credentials);
    var statement = "select * from movies"
    connection.query(statement, (error, result) => {
        if (error == null) {
            var data = JSON.stringify(result)
            connection.end();
            response.send(data);
        }
        else {
            var data = JSON.stringify(error);
            connection.end();
            response.send(data);
        }
    })

});


app.post('/' , (request , response) =>
{
    console.log("post")
    var connection = mysql.createConnection(credentials)
    var statement = `insert into movies values(${request.body.id},'${request.body.title}' , '${request.body.releas}');`
    console.log(statement);
    connection.query(statement , (error , result)=>
    {
        if(error == null)
        {
            connection.end();   
            response.send("affected Row : 1")
        }
        else
        {
            connection.end();
            response.send("error")
        }
    })
});

app.delete("/:No" , (request , response)=>
{
    console.log("in delete")
    var connection = mysql.createConnection(credentials);
    var statement = `delete from movies where id = ${request.params.No} ;`
    connection.query(statement , (error , result) =>
    {
        if(error == null )
        {
            connection.end();
            response.send("Done");
            
        }
        else{
            connection.end();
            response.send("error");
        }
    })
})

app.put('/:No' , (request , response) =>
{
    var connection = mysql.createConnection(credentials)
    var statement = `update movies set title = '${request.body.title}' , releas = ${request.body.add} where id = ${request.params.No};`
    console.log(statement);
    connection.query(statement , (error , result)=>
    {
        if(error == null)
        {
            connection.end();   
            response.send("affected Row : 1")
        }
        else
        {
            connection.end();
            response.send("error")
        }
    })
})

module.exports = app;
