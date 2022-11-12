const express = require('express');
const BodyParser = require('body-parser');
const port = 3000;
const sql = require('./DB');
const path = require('path');
const CRUD_operations = require('./CRUDFunctions');
const fs = require('fs');
const createDB = require('./createDB');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const foo = require('foo')



//setups
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(express.static(path.join(__dirname, "public")));



app.listen(port, ()=>{
    console.log("server is running on port " + port);
})


//routs
app.get('/', (req, res)=>{
    res.render('FirstPage');
    console.log("welcome" );
});


app.get('/log' , (req, res)=>{
    res.render('login');
});
app.get('/loginFailes' , (req, res)=>{
    res.render('loginFailes');
});

app.get('/signupFailed' , (req, res)=>{
    res.render('signupFailed');
});
app.get('/Signup' , (req, res)=>{
    res.render('Signup');
});
app.get('/Search' , (req, res)=>{
    res.render('Search');

});

app.get('/match' , (req, res)=>{
    res.render('match');

});
app.get('/FirstPage' , (req, res)=>{
    res.render('FirstPage');

});




//start
app.post("/newCustomer", CRUD_operations.createNewCustomer);
app.post("/login", CRUD_operations.login);
app.post("/Findservice", CRUD_operations.Findservice);


//creare DB tables
app.get("/CreateCustomersTable",createDB.CreateCustomersTable);
app.get("/CreateBeuticsTable" ,createDB.CreateBeuticsTable);
app.get("/CreateSearchesTable",createDB.CreateSearchesTable);

//insert into DB tables
app.get("/InsertDataTobeutics", createDB.InsertDataTobeutics);



//show DB tables
app.get("/ShowTableCustomers", createDB.ShowTableCustomers);
app.get("/ShowTableBeutics", createDB.ShowTableBeutics);
app.get("/ShowTablesearches", createDB.ShowTablesearches);

//drop DB tables
app.get('/DropCustomersTable', createDB.DropCustomersTable);
app.get('/DropBeuticsTable', createDB.DropBeuticsTable);
app.get('/DropSearchesTable', createDB.DropSearchesTable);