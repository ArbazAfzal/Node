const client = require('./express')
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors())

// client.query(`select * from customer`,(err,res)=>{
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
//     client.end();
// });

app.get('/customer', (req, res)=>{
    client.query(`Select * from customer`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        res.end()
    });

})

app.post('/customer', (req, res)=> {
     const customer = req.body;
     client.query(`INSERT into customer(id,name,phone,email,address)VALUES('${customer.id}', '${customer.name}', '${customer.phone}','${customer.email}', '${customer.address}')`,
(err, result)=>{
         if(!err){
             res.send('customer was successful')
             console.log(customer)
         }
         else{ console.log(err.message) }
     })
   client.end;
 })

 app.put('/customer/:id', (req, res)=> {
    let customer = req.body;
    let updateQuery = `update customer
                       set name = '${customer.name}',
                       phone = '${customer.phone}',
                       email = '${customer.email}',
                       address = '${customer.address}'
                       where id = ${customer.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')

        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/customer/:id', (req, res)=> {
    let deletQuery = `delete from customer where id=${req.params.id}`

    client.query(deletQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();

