require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const AuthRouter = require("./Routes/AuthRouter")
const UserRouter = require("./Routes/UserRouter")
const PostRouter = require("./Routes/PostRouter")
const FriendRouter = require("./Routes/FriendsRoute")
const ReactionRouter = require("./Routes/ReactRouter")
const CommentRouter = require("./Routes/CommentRouter")
const StoryRouter = require("./Routes/StoryRouter")
const corsoptions = require("./Corsoption")
const fileUpload = require('express-fileupload');



const cors = require('cors')
const PORT = process.env.PORT || 5000


//Application Lavel middlewares
app.use(cors(corsoptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


app.use("/auth", AuthRouter)
app.use("/user", UserRouter)
app.use("/post", PostRouter)
app.use("/friend", FriendRouter)
app.use('/react', ReactionRouter)
app.use('/comment', CommentRouter)
app.use('/story', StoryRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT :${PORT}`);
});
