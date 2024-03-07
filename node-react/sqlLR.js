
// const { error } = require("console")
const express=require("express")
const fs=require("fs")
const api=express()
const cors = require('cors');
const bodyParser = require('body-parser');
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

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
api.get("/login", (req, res) => {
  
  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);

  connection.query("select * from users where username=? AND password=?", [username, password], (error, data) => {
      if (error) {
          res.status(500).send("Internal Server error");
      } else {
          if (data.length > 0) {
              console.log(data);
              res.send("The user is successfully logged in");
          } else {
              console.log(data);
              res.send("Invalid credentials");
          }
      }
  });
});
  

api.listen(3030,()=>console.log("the port is running succesful"))
