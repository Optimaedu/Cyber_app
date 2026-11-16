import  express  from "express";
import indexRouter from "./routes/index.js";
import { devLogger, writeLogger } from "./middleware/logger.js";
import morgan from "morgan";

const app = express()
app.use(express.json({limit: "20kb"}))
app.use(devLogger)
app.use(morgan("combined", {stream: writeLogger}))
app.use('/v1', indexRouter)
app.get("/", (req, res)=> {
    res.json({msg:"test"})
})
 
export default app