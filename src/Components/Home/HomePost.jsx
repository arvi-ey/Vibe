import React, { useEffect, useState } from 'react'
import styles from "./home.module.css"
import Boy from "../../assets/boy.png"
import emotion from "../../assets/emotion.png"
import Live from "../../assets/Live.svg"
import postPhoto from "../../assets/postPhoto.svg"
import { useSelector } from 'react-redux'
import DemoUser from "../../assets/demo-user.png"
import CreatePost from '../CreatePost/Createpost'
import Alert from '../../Common/Alert'
import { useNavigate } from 'react-router'


const HomePost = () => {
    const navigate = useNavigate()
    const [openPostModal, setOpenPostModal] = useState(false)
    const { user } = useSelector(state => state.user)
    const [uploadpost, setUploadpost] = useState(false)

    const HomePostArray = [
        {
            title: "Live Video",
            photo: Live
        },
        {
            title: "Photo/Video",
            photo: postPhoto
        },
        {
            title: "Feeling/Activity",
            photo: emotion
        },

    ]
    const HandleOpenPostModal = () => {
        console.log("helllo")
        setOpenPostModal(true)
    }

    useEffect(() => {
        if (uploadpost) setTimeout(() => { setUploadpost(false) }, 2000)
    }, [uploadpost])

    return (
        <div className={styles.HomePostContainer} >
            <div className={styles.HomePostDiv1}>
                <div className={styles.HomepostuserImage} onClick={() => { navigate(`/profile/${user?.uid}`) }} >
                    <img src={user?.profile_image || DemoUser} alt='Homeuser' className={styles.HomepostuserImagelogo} />
                </div>
                <div className={`text-sm ${styles.HomepostType}`} onClick={HandleOpenPostModal} >
                    What's on your mind, {user?.first_name} ?
                </div>
            </div>
            <div className={styles.HomePostArrayContainer}>

                {
                    HomePostArray?.map((data, index) => {
                        return (
                            <div className={styles.HomePostArrayBox} key={index}>

                                <img src={data?.photo} alt='PostIcon' className={styles.HomePostArrayIcon} />

                                <p className={styles.HomePostArrayTitle}>
                                    {data?.title}
                                </p>
                            </div>

                        )
                    })
                }
            </div>
            {openPostModal &&
                <CreatePost
                    openModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                    setUploadpost={setUploadpost}
                />
            }
            <Alert
                message="Post was uploaded successfully."
                open={uploadpost}
            />
        </div>
    )
}

export default HomePost