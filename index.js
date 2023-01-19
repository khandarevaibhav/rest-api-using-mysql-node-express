const express = require('express')
const mysql = require('mysql2')

const app = express()
//const 
app.use(express.json())
const connection = mysql.createConnection({
    host: 
    user: 
    password: 
    database: 
})
connection.connect((error, result)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Connected !!")
    }
    
})
app.listen(2000,()=>console.log('listening on 2000'))

app.get('/api/fetch', (req, resp)=>{
    connection.query("select * from mytable", (error, result)=>{
        if((error)=>{ console.log(error)})
        //console.log(result)
        //to take json format output in a console also parse convert json text into a javascript object
        //and stringify is cnvert a javascript value into a json string
        var jsonOutput=JSON.parse(JSON.stringify(result))
        //console.log(jsonOutput[0])
        //resp.send(jsonOutput[0])
        resp.send(result)
    })
})

app.get('/api/fetchbyid/:id', (req, resp)=>{
    const fetchid = req.params.id
    connection.query("select * from mytable where id=?",fetchid, (error, result)=>{
        if(error){
             console.log(error)
            }
        else{
            if(result.length==0){
                console.log("Given id not present in database")
                resp.send("Given id is not present in database")
            }
            else{
                resp.send(result)
            }
        }
        }) 
    })

app.post('/api/addemployee', (req, resp)=>{
    console.log(req.body)
    //console.log(req.bod.id)
    //const id = req.body.id;
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const mobile_no= req.body.mobile_no;
    let find= "select * from mytable WHERE first_name='$first_name' and last_name='$last_name"
    if(!(mobile_no) || !(first_name) || !(last_name)){
        resp.send("Please fill all the given values like name and mobile no")
    }else{
        if(find==req.body.first_name){
            resp.send("User already exist")
        }else{
            connection.query("insert into mytable(first_name, last_name, mobile_no) values(?,?,?)",[first_name, last_name, mobile_no], (error, result)=>{
                if((error)=>{console.log(error)})
               resp.send(result)
            
            })
        }
        
    }
    

})

app.put('/api/updatebyid/:id', (req, resp)=>{
    const id = req.params.id;
    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const mobile_no=req.body.mobile_no;
    //let sql="update employee SET first_name='${first_name}' last_name='${last_name}' mobile_no='${mobile_no}' WHERE id='${req.params.id}'";
    let sql= "UPDATE mytable SET first_name=?, last_name=?, mobile_no=? WHERE id=?"
    connection.query(sql,[first_name, last_name, mobile_no, id], (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            if(result.affectedRows==0){
                resp.send("Given id not present in table")
            }
            else{
                resp.send(result)
            }
            
        }
        
    })
})

app.delete('/api/deletebyid/:id', (req, resp)=>{
    let deleteId = req.params.id;
    let sql="delete from mytable WHERE id=?";
    connection.query(sql,[deleteId], (error, result)=>{
        if(error){
            console.log(error)
        }else{
            if(result.affectedRows==0){
                resp.send("Given id is not assigned to any employee")
            }else{
                resp.send(result)
            }

        }
        
    })
})
