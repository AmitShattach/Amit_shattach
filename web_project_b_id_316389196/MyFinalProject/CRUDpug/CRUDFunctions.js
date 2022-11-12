const sql = require("./DB.js");
var path = require('path');
const e = require("express");
var url = require('url');
const { Console } = require('console');


//create customer
const createNewCustomer = function(req,res){
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = currentdate.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    var hh = currentdate.getHours();
    var mi = currentdate.getMinutes();
    var ss = currentdate.getSeconds();
    currentdate = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;

    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
   
    sql.query("SELECT * FROM customers where userEmail = ?" , req.body.email, (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);//would like to fix it so the customer would have an indication2
            return;
        }
        console.log(results);
        if(results.length == 0){
            const newCustomer = {
                "userEmail": req.body.email,
                "password": req.body.password,
                "uploadedOn": currentdate
            };
            console.log(newCustomer);
            sql.query("INSERT INTO customers SET ?", newCustomer, (err, mysqlres)=>{
                if (err) {
                    console.log("ERROR: ", err);
                    res.status(400).send({message: "error in creating an account1 " + err});
                    return;
                }
                console.log("New user created");
                res.redirect('/Search');
                return;
            } )
        }else{
            res.redirect('/signupFailed');
        }    
    } )};

const login = function(req,res){

    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    console.log(req.body.email);
    sql.query("SELECT * FROM customers where userEmail = ? and password = ?" , [req.body.email,req.body.password] , (err, results)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        console.log(results);
        if(results.length == 0){
            res.redirect('/loginFailes');
            return;
            
        } else {
            res.redirect('/Search');
        }
        return;
    } )
    };
  
    

    
const Findservice = function(req,res){
	// Capture the input fields
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = currentdate.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    var hh = currentdate.getHours();
    var mi = currentdate.getMinutes();
    var ss = currentdate.getSeconds();
    currentdate = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;

    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    const newSearch = {
        "ServiceName" : req.body.ServiceType,
        "cityname": req.body.City, 
        "lat" :req.body.lat,
        "blong" :req.body.blong,
        "uploadedOn": currentdate
     };
    console.log(newSearch); 

    //insert the new search details to the db
    sql.query("INSERT INTO Searches SET ?", newSearch, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating Search object: " + err});
            return;
        }
        console.log("new Search added to db");
        
        return;
    });
    const location = {
        "lat": req.body.lat,
        "blong" : req.body.blong
        }

        const lat= req.body.lat;
        const blong= req.body.blong;

   
        if(lat==0 && blong==0){
            console.log('yes');
        
                sql.query('select * from beutics where city like ? and serviceName like ?',[req.body.City, req.body.ServiceType], (err, mysqlres)=>{
                    if (err) {
                        console.log("ERROR: ", err);
                        res.status(400).send({message: "error in creating new message " + err});
                        return;
                    }else{
                    console.log(mysqlres);
                    if (mysqlres.length == 0) {
                       res.redirect('/Search');
                      
                       }
                    else {
                       res.render('match', {
                             pple: mysqlres
                           });
                        }
                        return;
                }
            }  )}else{
                sql.query('select * from beutics where district like ? and serviceName like ?',[req.body.district, req.body.ServiceType] , (err, mysqlres)=>{
                    if (err) {
                        console.log("ERROR: ", err);
                        res.status(400).send({message: "error in creating new message " + err});
                        return;
                    }else{
                    console.log(mysqlres);
                    if (mysqlres.length == 0) {
                       res.redirect('/Search');
                       }
                    else {
                       res.render('match', {
                             pple: mysqlres
                           });
                       }
                  return;
                }     
            }
                )}         
};






module.exports = {createNewCustomer , login , Findservice };