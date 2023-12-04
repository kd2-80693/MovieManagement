var express = require('express')
var app = express();
var cors = require('cors')
var auth = require('./Routes/auth')
var register = require('./Routes/register')
var home = require('./Routes/home')
var jwt = require('jsonwebtoken')
var mysql = require('mysql2')
var credentials = {
    host: "localhost",
    database: "abc",
    user: "abc",
    password: "abc"
}

app.use(cors());

app.use(express.json());

app.use("/login", auth);

app.use("/register", register);

// app.use((request, response, next) => {

//     var token = request.headers.authorization
//     console.log(token);
//     jwt.verify(token, "252525", (err, objFromToken) => {

//         if (err == null) {
//             var statement = `select * from auth where user = '${objFromToken.u}' and pass = '${objFromToken.p}';`

//             var connection = mysql.createConnection(credentials);
//             connection.query(statement, (error, result) => {

//                 if (error == null && result.length > 0) {
//                     connection.end();

//                     next();
//                 }
//             })
//         }
//         else {

//             response.send("Token error");
//         }
//     });


// })

app.use("/home", home);

app.listen(9999, () => { console.log("SERVER STARTED AT 9999") })

