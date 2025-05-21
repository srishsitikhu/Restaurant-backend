import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import resturantRoute from "./routes/resturant.route"

const app= express()
dotenv.config()


app.use("/api/resturants", resturantRoute)

app.get("/", (req, res)=>{
    res.send("API IS RUNNING >>>")
})

export default app;

