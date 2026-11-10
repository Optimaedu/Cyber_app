import  express  from "express";
import indexRouter from "./routes/index.js";


const app = express()
app.use(express.json({limit: "20kb"}))
app.use('/v1', indexRouter)
app.get("/", (req, res)=> {
    res.json({msg:"test"})
})
 
export default app