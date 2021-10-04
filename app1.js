//CONNECT TO NODE APP

const express = require('express');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3000;
const app = express();

//connect the node app to mysql
const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "frootloops!",
});

con.connect((err)=>
{
    if(!err)
    {
        console.log("connected to mysql server")
    }
});

// DROP A TABLE
// PERFORM CRUD OPERATIONS
// JOIN TABLES
// CALL A STORED PROCEDURE


app.listen(PORT, () => {
    console.log('Listening to port ${PORT}');
});