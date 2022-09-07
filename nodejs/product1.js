const client = require('./express')
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())


app.post('/product', (req, res)=> {
    const product = req.body;
    let insertQuery = `INSERT INTO product(id,name,description,price,color) 
                       VALUES(${product.id}, '${product.name}', '${product.description}', '${product.price}','${product.color}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('New product insert successful')
        }
        else{ 
            console.log("ERROR",err.message) }
    })
    client.end;
})


app.get('/product', (req, res)=>{
    client.query(`select * from product`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        res.end()
    });

})

app.put('/product/:id', (req, res)=> {
    let product = req.body;
    let updateQuery = `update product
                       set name = '${product.name}',
                       description = '${product.description}',
                       price = '${product.price}',
                       color = '${product.color}'
                       where id = ${product.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')

        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.delete('/product/:id', (req, res)=> {
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
