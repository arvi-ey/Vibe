import React, { useEffect, useState } from 'react'
import styles from "./story.module.css"
import AddIcon from '@mui/icons-material/Add';
import CreatePost from '../../CreatePost/Createpost';
import { useSelector } from 'react-redux';
import DemoUser from "../../../assets/demo-user.png"
const CreateStory = () => {
    const [openPostModal, setOpenPostModal] = useState(false)
    const [uploadpost, setUploadpost] = useState(false)
    const [clickedicon, setClickedIcon] = useState(null)
    const { user } = useSelector(state => state.user)


    useEffect(() => {
        if (uploadpost) setTimeout(() => { setUploadpost(false) }, 2000)
    }, [uploadpost])



    const HandleOpenPostModal = (clickedobj) => {
        if (clickedobj.title) setClickedIcon(clickedobj.title)
        else setClickedIcon(null)
        setOpenPostModal(true)
    }



    return (
        <>

            <div className={styles.storyUserBoxContainer} onClick={() => HandleOpenPostModal("Story")}>
                <img src={user?.profile_image || DemoUser} alt='user' className={styles.UserprofileImage} />
                <div className={styles.AddIconDiv}  >
                    <AddIcon className={styles.AddIcon} />
                </div>
                <span className={styles.CreateStoryText} >Create Story</span>
            </div>
            {
                openPostModal &&
                <CreatePost
                    openModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                    setUploadpost={setUploadpost}
                    clickedicon={clickedicon}
                    postType="Story"
                />
            }
        </>
    )
}

export default CreateStory