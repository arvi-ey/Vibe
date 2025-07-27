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
import { useNavigate } from 'react-router';
import useReact from '../../../Hooks/useReact';
import ReactionBox from '../../../Common/ReactionBox';



const PostBox = ({ data, key }) => {
    const { user } = useSelector(state => state.user)
    const { DeletePost, loading, GetPostReaction } = usePost()
    const { HandleReaction } = useReact()
    const [showMenu, setShowMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [deletedpost, setDeletedPost] = useState(false)
    const [react, setReact] = useState()
    const [reactions, setReactions] = useState([])
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState("")

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

    useEffect(() => {
        if (data?.likes) {
            setReactions(data?.likes)
        }
    }, [data.likes])

    useEffect(() => {
        if (reactions?.length > 0) {
            const result = reactions.find((data) => data.user_id == user?.uid)
            if (result) setReact(true)
        }
    }, [reactions])


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
    const HandleNavigateToProfile = () => {
        navigate(`/profile/${data?.userid}`)
    }
    const HandleReact = async (value) => {
        setReact(value)
        let obj = {
            post_id: data?.postid,
            user_id: user.uid,
            time: Date.now(),
            type: value ? "set" : "remove",
        }
        const result = await HandleReaction(obj)
        if (value) setReactions([...reactions, result])
        else {
            const newReactions = reactions?.filter(data => data.reaction_id != result?.reaction_id)
            setReactions(newReactions)
        }
    }
    const HandleOpenModal = (type) => {
        setOpenModal(!openModal)
        setModalType(type)
    }


    return (
        <Card sx={{ minWidth: 200 }} className={` ${styles.postBox}`} key={key}>
            <CardContent className={`shadow-2xl ${styles.postContainer}`} >
                {
                    loading &&

                    <ProgressBar width="100%" />
                }
                <div className={styles.postDiv1} >
                    {
                        data?.userinfo?.profile_image || user?.profile_image ?
                            <img src={data?.userinfo?.uid == user?.uid ? user.profile_image : data.userinfo.profile_image} alt='profile_photo' className={styles.User_ProfilePhoto} onClick={HandleNavigateToProfile} loading='lazy' />
                            :
                            <img src={DemoUser} alt='profile_photo' className={styles.User_ProfilePhoto} onClick={HandleNavigateToProfile} loading='lazy' />
                    }
                    <div className={styles.user_name}>
                        <div className='flex gap-2  items-center'>
                            <p className='text-sm'>
                                {`${data?.userinfo?.first_name}  ${data?.userinfo?.last_name}`}
                            </p>
                            <p className='text-xs font-medium opacity-70'>{data?.post_type == "profile_image" ? "Updated profile photo" : data?.post_type == "cover_photo" ? "Updated cover photo" : ""}</p>
                        </div>
                        <p>
                            {data?.time}
                        </p>
                    </div>
                    <div className={styles.postOption} >
                        {user?.uid == data?.userinfo?.uid &&
                            <MoreHorizIcon style={{ cursor: "pointer", }} onClick={HandleOpenMenu} />
                        }
                    </div>

                </div>
                <div className={styles.PostCaption} >{data?.caption}</div>
                {
                    data?.image ?
                        <div className={styles.postDiv2}>
                            <img src={data.image} alt='user_posted' className={styles.user_postedPhoto} />
                        </div>
                        :
                        null
                }
                <div className={styles.postDiv3}>
                    <div className={styles.postOptions1}>
                        {
                            react ?
                                <FavoriteIcon className={styles.LikeIcon} style={{ color: "red" }} fontSize='medium' onClick={() => HandleReact(false)} />
                                :
                                <FavoriteBorderIcon className={styles.LikeIcon} fontSize='medium' onClick={() => HandleReact(true)} />
                        }
                        {
                            reactions?.length > 0 &&
                            <span className={styles.PostInfo} onClick={() => HandleOpenModal("reaction")}>{reactions?.length} {`${reactions?.length > 1 ? "Likes" : "Like"}`}</span>
                        }
                    </div>
                    <div className={styles.postOptions2}>
                        <MessageCircle className={styles.CommentIcon} onClick={() => HandleOpenModal("comments")} />
                        <span className={styles.PostInfo} onClick={() => HandleOpenModal("comments")}> 30 Comments</span>
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
            {
                openModal && <ReactionBox

                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    type={modalType}
                    userArray={modalType == 'reaction' ? reactions : comments}
                // userArray={modalType == 'comments' ? reactions : comments}
                />
            }

        </Card>
    )
}



export default PostBox