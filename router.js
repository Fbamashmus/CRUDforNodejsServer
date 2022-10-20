const express = require("express");
const route = express.Router(); 
var accounts = require("./db")

route.get('/accounts', (req,res)=>{
    res.json({userData:accounts});
})

//Create
route.post('/accounts',(req, res) => {
    const incomingAccounts = req.body
    accounts.push(incomingAccounts);
    res.json(accounts);
})

//Search
route.get('/accounts/:ISBN/:name',(req, res)=>{
    const accountid = Number(req.params.ISBN);
    const getAccount = accounts.find((account)=> account.ISBN ===accountid );

    if(!getAccount){
        res.status(500).send("Account not found");
    }else{
        res.json({userData: [getAccount]});
    }
});

//Update
route.put('/accounts/:ISBN', (req, res) => {
    const accountid = Number(req.params.ISBN);
    const body = req.body;
    const account = accounts.find((account)=>account.ISBN===accountid);
    const index = accounts.indexOf(account);

    if(!account){
        res.status(500).send("Account not found");
    }else{
        const updateAccount = {...account, ...body}
        accounts[index]=updateAccount;
        res.send(updateAccount);
    }
});

//Delete
route.delete('/accounts/:ISBN', (req, res)=>{
    const accountid = Number(req.params.ISBN);
    const newAccounts = accounts.filter((account)=> account.ISBN != accountid);

    if(!newAccounts){
        res.status(500).send("Account not found");
    }else{
        accounts=newAccounts;
        res.send(accounts);
    }
})

module.exports = route; 