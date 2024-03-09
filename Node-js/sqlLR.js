
// const { error } = require("console")
const express=require("express")
const fs=require("fs")
const api=express()
const cors = require('cors');
api.use(cors());

const jwt=require("jsonwebtoken")
// const [username,password,email]=
api.use(express.json())
let connection=require("./db.js")

api.post("/register",(req,res)=>{
    // console.log(req.body)

    const {username,password,email,confirmPassword}=req.body


    connection.query("select * from users where username=? OR email=?",[username,email],(error,data)=>{
      
      if(error){
        res.status(500).send("Internal Server error")
      }
      if(data.length>0){
        res.send("The user is already exists")
      }
      else{
        connection.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)",[username,password,email],(error)=>{
          if(error){
            res.status(400).send("an error occurred")
          }
          res.json("successfully register")
        })
      }
    })
    

    // fs.readFile("index.json",(err,data)=>{
    //     // res.send(data)
    //     const users=JSON.parse(data)
    //     console.log(users)
    //     const foundUser = users.find(user => user.username === username || user.email === email)

    //     if(foundUser){
    //         res.send("the user is already exist")
    //     }
        
    //     else{
    //         users.push(req.body)

    //         fs.writeFile("index.json",(JSON.stringify(users,null,2)),(err)=>{
    //             res.json("success register")
    //         })
    //     }

    // })

    
        // register=req.body

})



//Login
api.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      alert("Username and password are required")
      return res.status(400).send("Username and password are required");
  }

    connection.query("select * from users where username=? AND password=?",[username,password],(error,data)=>{
      if(error){
        res.status(500).send("internal server error")
      }
      if(data.length>0){
        // res.send("The user is successful login")
        res.json({
          message: "The user is successfully logged in",
          user_id: data[0].user_id  
      });
      }
      else{
        res.send("Invalid credentials")
      }
    })

    // fs.readFile("./index.json", (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send("Internal Server Error");
    //     return;
    //   }
    //   const users = JSON.parse(data);
    //   const foundUser = users.find(user => user.username === username && user.password === password);
  
    //   if (foundUser) {
    //     res.send("The user is successfully logged in");
    //   } else {
    //     res.send("Invalid login credentials");
    //   }
    // });


  });
  

api.listen(3030,()=>console.log("the port is running succesful"))
