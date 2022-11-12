var SQL = require('./DB');
var path = require("path");
const { Console } = require('console');
const csv = require('csvtojson');



//create Customers table
const CreateCustomersTable = (req,res)=> {
    var Q0 = `  CREATE TABLE IF NOT EXISTS Customers (
        userEmail varchar(255) NOT NULL PRIMARY KEY, 
        password varchar(255) NOT NULL, 
        uploadedOn datetime NOT NULL 
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    SQL.query(Q0,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Users table"});
            return;
        }
        console.log('created Customers table');
        res.send("Customers table created");
        return;
    })      
}

//create Beutics table
const CreateBeuticsTable = (req,res)=> {
    var Q1 = `CREATE TABLE IF NOT EXISTS beutics (
        Bemail varchar(255)  NOT NULL PRIMARY KEY ,
        name varchar(255) NOT NULL,
        city varchar(255) NULL ,
        district varchar(255) NULL,
        phoneNumber int(11) NULL,
        picture nvarchar(1000)  NULL ,
        lat varchar(255) NOT NULL ,
        blong varchar(255) NOT NULL,
        ServiceName varchar(255) NOT NULL ,
        price int(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Doctors table"});
            return;
        }
        console.log('created beutics table');
        res.send("beutics table created");
        return;
    })      
}


//create Searches table
const CreateSearchesTable = (req,res)=> {
    var Q4 = `CREATE TABLE IF NOT EXISTS Searches (
        ServiceName varchar(255) NOT NULL,
        cityname varchar(255) NULL,
        lat varchar(255)  NULL,
        blong varchar(255)  NULL,
        uploadedOn datetime NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;
    SQL.query(Q4,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating Searches table"});
            return;
        }
        console.log('created Searches table');
        res.send("Searches table created");
        return;
    })      
}

//insert into beutics table
const InsertDataTobeutics = (req,res)=>{
    var Q5 = "INSERT INTO beutics SET ?";
    const csvFilePath1= path.join(__dirname, "beutics.csv");
    csv()
    .fromFile(csvFilePath1)
    .then((jsonObj)=>{
        //console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "Bemail": element.Bemail,
                "name": element.name,
                "city": element.city,
                "district":element.district,
                "phoneNumber": element.phoneNumber,
                "picture": element.picture,
                "lat": element.lat,
                "blong": element.blong,
                "ServiceName": element.ServiceName,
                "price": element.price

            }
            SQL.query(Q5, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting beutics data", err);
                }
                console.log("created row sucssefuly ");
            });
        });
    })
    res.send("beutics Data read");

}


//drop Customers officeHours
const DropCustomersTable = (req, res)=>{
    var Q8 = "DROP TABLE Customers";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Customers table ", err);
            res.status(400).send({message: "error im dropping Customers table" + err});
            return;
        }
        console.log("Customers table drpped");
        res.send("Customers table drpped");
        return;
    })
}

//drop Beutics officeHours
const DropBeuticsTable = (req, res)=>{
    var Q9 = "DROP TABLE Beutics";
    SQL.query(Q9, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Beutics table ", err);
            res.status(400).send({message: "error im dropping Beutics table" + err});
            return;
        }
        console.log("Beutics table drpped");
        res.send("Beutics table drpped");
        return;
    })
}


//drop Searches officeHours
const DropSearchesTable = (req, res)=>{
    var Q12 = "DROP TABLE Searches";
    SQL.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Searches table ", err);
            res.status(400).send({message: "error im dropping Searches table" + err});
            return;
        }
        console.log("Searches table drpped");
        res.send("Searches table drpped");
        return;
    })
}


//show table Customers
const ShowTableCustomers = (req,res)=>{
    var Q13 = "SELECT * FROM Customers";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Customers table ", err);
            res.send("error in showing Customers table ");
            return;
        }
        console.log("showing Customers table");
        res.send(mySQLres);
        return;
    })
}

//show table Beutics
const ShowTableBeutics = (req,res)=>{
    var Q14 = "SELECT * FROM Beutics";
    SQL.query(Q14, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing Beutics table ", err);
            res.send("error in showing Beutics table ");
            return;
        }
        console.log("showing Beutics table");
        res.send(mySQLres);
        return;
    })
}

//show table searches
const ShowTablesearches = (req,res)=>{
    var Q17 = "SELECT * FROM searches";
    SQL.query(Q17, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing searches table ", err);
            res.send("error in showing searches table ");
            return;
        }
        console.log("showing searches table");
        res.send(mySQLres);
        return;
    })
}

module.exports = {CreateCustomersTable , CreateBeuticsTable,  CreateSearchesTable, InsertDataTobeutics, DropCustomersTable, DropBeuticsTable,
     DropSearchesTable, ShowTableCustomers, ShowTableBeutics, ShowTablesearches};