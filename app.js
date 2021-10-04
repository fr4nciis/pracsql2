//connect to node app
const express = require('express');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3000;
const app = express();

//connect the node app to mysql
const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Francis123",
    database: "campus"
    
});

con.connect((err)=>
{
    if(!err)
    {
        console.log("connected to mysql server")
    }
});

//create a db
app.get("/create-schooldb",(req,res)=>{
    let sql2 = "CREATE DATABASE campus";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send("successfully created the school db");
        }
        else{
            res.send("failed to create db");
        }
    })
});
//create a table
app.get("/create-student-table",(req,res)=>{
    let sql2 = "CREATE TABLE student(id int AUTO_INCREMENT, fname varchar(50),lname varchar(50),age int, PRIMARY KEY(id))" ;
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to create student table");
        }
    })
});
//perform crud ops
//c - create
app.get("/insert-student",(req,res)=>{
    let newRow = {fname:"juan",lname:"dela cruz", age:19};
    let sql2 ="INSERT INTO student SET ?";
    con.query(sql2,newRow,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to insert student table");
        }
    })
});
//r - read
app.get("/read-student",(req,res)=>{
    let sql2 ="SELECT * FROM student";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to read student table");
        }
    })
});
//u - update
app.get("/update-student",(req,res)=>{
    let sql2 ="UPDATE student SET fname='John' WHERE id=1";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to update student table");
        }
    })
});
//d - delete
app.get("/delete-student",(req,res)=>{
    let sql2 ="DELETE FROM student WHERE id=1";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to delete student");
        }
    })
});
//join tables
app.get("/read-student2",(req,res)=>{
    let sql2 ="SELECT student.id, student.fname, student.lname, section.code, section.course" +
    " FROM student" +
    " INNER JOIN section" + 
    " ON student.secid = section.secid";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to select student");
        }
    })
});
//call a stored procedure
app.get("/call-students",(req,res)=>{
    let sql2 ="CALL DisplayStudent()";
    con.query(sql2,(err,result)=>
    {
        if(!err)
        {
            res.send(result);
        }
        else{
            res.send("failed to call the DisplayStudent() procedure");
        }
    })
});




app.listen(PORT, () =>
{
    console.log("listening to port " + PORT );
});