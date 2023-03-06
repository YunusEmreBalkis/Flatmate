require("dotenv").config()
require("express-async-errors");

const express  = require("express");
const app = express();

const connectDb = require("./db/connect")

//rest of packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

//Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dormitoryRoutes = require("./routes/dormitoryRoutes");
const activityRoutes = require("./routes/activityRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes")
const foodlistRoutes = require("./routes/foodListRoutes");


//Middleware
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler")


app.use(express.json())
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));


app.get("/api/v1",(req,res) => {
    res.send("Home Page");
})
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/dormitory",dormitoryRoutes);
app.use("/api/v1/activity",activityRoutes);
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/comment",commentRoutes);
app.use("/api/v1/foodlist",foodlistRoutes);

app.use(notFound)
app.use(errorHandleMiddleware)

const port = process.env.PORT ||"7000";

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(port, ()=>console.log(`Server listening on port ${port}`));
    } catch (error) {
        
    }
}

start();
console.log("Flatmate Apı")