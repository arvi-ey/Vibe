require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const AuthRouter = require("./Routes/AuthRouter")
const UserRouter = require("./Routes/UserRouter")
const corsoptions = require("./Corsoption")

const cors = require('cors')
const PORT = process.env.PORT


//Application Lavel middlewares
app.use(cors(corsoptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use("/auth", AuthRouter)
app.use("/user", UserRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT :${PORT}`);
});
