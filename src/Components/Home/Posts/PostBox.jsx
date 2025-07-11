import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./post.module.css"
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MessageCircle } from 'lucide-react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DemoUser from "../../../assets/demo-user.png"




const PostBox = ({ data, key }) => {
    return (
        <Card sx={{ minWidth: 275 }} className={styles.postBox}>
            <CardContent className={styles.postContainer} >
                <div className={styles.postDiv1} >
                    <img src={data?.profile_image || DemoUser} alt='profile_photo' className={styles.User_ProfilePhoto} />
                    <div className={styles.user_name}>
                        <span>
                            {`${data?.first_name}  ${data?.last_name}`}
                        </span>
                        <span>
                            {data?.time}
                        </span>
                    </div>
                    <div className={styles.postOption} >
                        <MoreHorizIcon style={{ cursor: "pointer", }} />
                        <CloseIcon style={{ cursor: "pointer", }} />
                    </div>

                </div>
                <div className={styles.PostCaption} >{data?.caption}</div>
                <div className={styles.postDiv2}>
                    <img src={data?.image} alt='user_posted' className={styles.user_postedPhoto} />
                </div>
                <div className={styles.postDiv3}>
                    <div className={styles.postOptions}>
                        <FavoriteBorderIcon className={styles.LikeIcon} fontSize='medium' />
                        <span className={styles.PostInfo}>40 Likes</span>
                    </div>
                    <div className={styles.postOptions}>
                        <MessageCircle className={styles.CommentIcon} />
                        <span className={styles.PostInfo}> 30 Comments</span>
                    </div>
                    <div className={styles.postOptions}>
                        <BookmarkBorderIcon className={styles.shareIcon} />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}



export default PostBox