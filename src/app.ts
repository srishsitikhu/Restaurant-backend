import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import resturantRoute from "./routes/resturant.route"
import path from "path"
import uploadRoutes from "./routes/upload.routes"
import authRoutes from "./routes/auth"
import protectedRoutes from "./routes/protectedRoute"
import userRoutes from "./routes/user.route"

const app= express()
dotenv.config()
app.use(cors());
app.use(express.json());


app.use("/api/restaurants", resturantRoute)
// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));;

app.use("/api/upload", uploadRoutes)            // for uploading the file
app.use("/auth", authRoutes)                       // for authentication
app.use("/api/users", userRoutes)               // for users creating and getting
app.use("/protected", protectedRoutes)          // for protecting the invalid authorization



app.get("/", (req, res)=>{
    res.send("API IS RUNNING >>>")
})

export default app;

