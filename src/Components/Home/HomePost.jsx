import React, { useState } from 'react'
import styles from "./home.module.css"
import Boy from "../../assets/boy.png"
import emotion from "../../assets/emotion.png"
import Live from "../../assets/Live.svg"
import postPhoto from "../../assets/postPhoto.svg"
import { useSelector } from 'react-redux'
import DemoUser from "../../assets/demo-user.png"
import CreatePost from '../CreatePost/Createpost'


const HomePost = () => {
    const [openPostModal, setOpenPostModal] = useState(false)
    const { user } = useSelector(state => state.user)

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

    return (
        <div className={styles.HomePostContainer} >
            <div className={styles.HomePostDiv1}>
                <div className={styles.HomepostuserImage} >
                    <img src={user?.profile_image || DemoUser} alt='Homeuser' className={styles.HomepostuserImagelogo} />
                </div>
                <div className={styles.HomepostType} onClick={HandleOpenPostModal} >
                    What's on your mind, {user?.first_name} ?
                </div>
            </div>
            <div className={styles.HomePostArrayContainer}>

                {
                    HomePostArray?.map((data, index) => {
                        return (
                            <div className={styles.HomePostArrayBox} key={index}>

                                <img src={data?.photo} alt='PostIcon' className={styles.HomePostArrayIcon} />

                                <div className={styles.HomePostArrayTitle}>
                                    {data?.title}
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            {openPostModal &&


                <CreatePost
                    openModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                />
            }
        </div>
    )
}

export default HomePost