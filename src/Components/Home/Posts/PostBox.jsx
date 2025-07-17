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
import MenuBox from '../../../Common/MenuBox';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import usePost from '../../../Hooks/usePost';
import Alert from '../../../Common/Alert';
import { useEffect } from 'react';
import ProgressBar from '../../../Common/ProgressBar';




const PostBox = ({ data, key }) => {
    const { user } = useSelector(state => state.user)
    const { DeletePost, loading } = usePost()
    const [showMenu, setShowMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [deletedpost, setDeletedPost] = useState(false)

    const HandleOpenMenu = (e) => {
        setAnchorEl(e.target)
        setShowMenu(true)
    }
    const MenuItems = [
        {
            title: "Delete",
            icon: <DeleteIcon sx={{ color: "red", opacity: "0.6" }} />
        },
    ]

    const OnClickMenu = async (title) => {
        if (title == "Delete") {
            const { image_public_id, postid } = data
            setAnchorEl(null)
            const result = await DeletePost({ image_public_id, postid })
            if (result && result?.postid && !loading) {
                setDeletedPost(true)
            }
        }
    }

    useEffect(() => {
        if (deletedpost) {
            setTimeout(() => {
                setDeletedPost(false)
            }, 1000)
        }
    })

    return (
        <Card sx={{ minWidth: 200 }} className={` ${styles.postBox}`} key={key}>
            <CardContent className={`shadow-2xl ${styles.postContainer}`} >
                {
                    loading &&

                    <ProgressBar width="100%" />
                }
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
                        {user.uid == data?.userid &&
                            <MoreHorizIcon style={{ cursor: "pointer", }} onClick={HandleOpenMenu} />
                        }
                        {/* <CloseIcon style={{ cursor: "pointer", }} /> */}
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
                {
                    showMenu &&
                    <MenuBox
                        anchorEl={anchorEl}
                        items={MenuItems}
                        setAnchorEl={setAnchorEl}
                        OnClickMenu={OnClickMenu}
                        loading={loading}
                    />
                }

            </CardContent>
            <Alert
                message="Post deleted successfully."
                open={deletedpost}
            />
        </Card>
    )
}



export default PostBox