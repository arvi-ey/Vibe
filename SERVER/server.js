require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const cors = require('cors')
const PORT = process.env.PORT


//Application Lavel middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors())

// Default route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT :${PORT}`);
});
