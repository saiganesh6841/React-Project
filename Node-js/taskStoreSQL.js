const express = require("express");
const app = express();
app.use(express.json());
const connection = require("./db.js");
const cors = require('cors');
app.use(cors());

app.post("/storetask", (req, res) => {
    const { user_id, title, description } = req.body;

    connection.query("INSERT INTO taskstore ( user_id,title, description) VALUES (?, ?, ?)", [user_id,title, description], (error, result) => {
        if (error) {
            console.error("Error storing task:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.json("The task stored successfully");
        }
    });
});

app.get("/gettasks/:user_id", (req, res) => {
  const userId = req.params.user_id;

  connection.query("SELECT * FROM taskstore WHERE user_id = ?", [userId], (error, results) => {
      if (error) {
          console.error("Error fetching tasks:", error);
          res.status(500).send("Internal Server Error");
      } else {
          res.status(200).json(results);
      }
  });
});



  app.delete("/delete/:taskId",(req,res)=>{
    const taskId=req.params.taskId
     
    connection.query("DELETE FROM taskstore where task_id=?",[taskId],(error,result)=>{
      if(error){
        console.log(error)
        res.status(500).send("INternal server error")
      }
      else{
        res.json("the task deleted succssfully")
      }
    })
  })

app.listen(3010, () => {
    console.log("The server is working");
});
