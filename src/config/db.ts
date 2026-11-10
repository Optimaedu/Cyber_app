import { Pool } from "pg"


const db = new Pool({
    user: "chris2",
    host: "172.16.1.32",
    database: "mydb2",
    password: "1234",
    port: 5432
})

db.connect((err)=> {
    if(err){
        console.log(err)
    }
    console.log("connected")
})

export default db