const client = require('./express')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.post('/orders', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO orders(id,cust_id,pro_id,totalprice,reviews) 
                       VALUES(${user.id}, '${user.cust_id}', '${user.pro_id}', '${user.totalprice}','${user.reviews}')`

    client.query(insertQuery, (err, result)=>{
        
        if(!err){
            res.send('New Customer insert successful')
        }
        else{ 
            console.log("ERROR",err.message) }
    })
    client.end;
});

app.get('/orders', (req, res)=>{
    client.query(`select * from orders`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        res.end()
    });

})


app.put('/orders/:id', (req, res)=> {
    let orders = req.body;
    let updateQuery = `update orders
                       set cust_id = '${orders.cust_id}',
                       pro_id = '${orders.pro_id}',
                       totalprice = '${orders.totalprice}',
                       reviews = '${orders.reviews}'
                       where id = ${orders.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')

        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/orders/:id', (req, res)=> {
    let deletequery = `delete from product where id=${req.params.id}`

    client.query(deletequery, (err, result)=>{
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