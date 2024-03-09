
let sql=require("mysql2")

let con=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"@Sairr123",
    database:"taskhub"
})

con.connect(()=>{
    console.log("hello sql is connnected")
})

module.exports=con;