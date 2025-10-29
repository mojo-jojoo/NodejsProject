import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"//mera server sai user ka browser uski cookies access krpao or uski cookies set bhi krpao(yh kam ha iska )usig crud kuch opt method hote secure cookies jo server pr direct rkh sakhte or server he read krskhta ha remove krskhta 

const app = express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
})) //khali app.use(cors()) krne sai mera server kisi bhi domain sai request accept krlega or credentials:true krne sai mera server cookies wgrh bhej skhta or receive krskhta lkin hum apne server pr cors origin define kr rhe hain jiska mtlb yh ha ki sirf yh domain meri api ko access krskhta ha yeh cors origin env file pr define krna hain


//json sai kitna data bhj skhte hein yh middleware nichy define kr rhe hein server crashed thori krna unlimited json data sai 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))//bs yh asi apne server pr images wgrh rkhne k liya favicon apne server pr rkh sakhte 
app.use(cookieParser())


// routes import userRoutes from "./routes/user.routes.js"
import userRoutes from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRoutes)  


export{app}

