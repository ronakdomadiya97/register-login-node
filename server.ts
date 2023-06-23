import express,{Application,Request,Response} from "express";
import dotenv from "dotenv"
import { DButil } from "./util/DButil";
import clientrouter from "./Router/clientrouter";


const app : Application = express()
dotenv.config({
    path : "./.env"
})

const port : string | number =process.env.PORT ||9000
const hostname : string | undefined =process.env.HOSTNAME
const dburl : string | undefined =process.env.DB_URL
const dbname : string | undefined =process.env.DB_DATABASE


app.get("/",(request : Request , response : Response)=>{
    return response.status(200).json({
        msg : "Hello....!"
    })
})
app.use(express.json())
app.use("/client",clientrouter)

if(port && hostname){
    app.listen(Number(port),hostname,()=>{
        if(dburl && dbname){
            console.log(`${dburl}:${dbname}`);
            DButil.connectToDB(dburl,dbname).then((dbResponse)=>{
                console.log(dbResponse);
            }).catch((error)=>{
                console.log(error)
                process.exit(0)
            })
        }
        console.log(`server has been started at http://${hostname}:${port}`); 
    })
}
