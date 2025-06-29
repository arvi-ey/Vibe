import React from 'react'
import styles from "./home.module.css"
import Boy from "../../assets/boy.png"
// import emotion from "../../assets/emotion.png"
// import emotion from "../../assets/emotion.svg"
import emotion from "../../assets/emotion.png"
// import Live from "../../assets/Live.png"
import Live from "../../assets/Live.svg"
// import postPhoto from "../../assets/postPhoto.png"
import postPhoto from "../../assets/postPhoto.svg"

const HomePost = () => {

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

    return (
        <div className={styles.HomePostContainer} >
            <div className={styles.HomePostDiv1}>
                <div className={styles.HomepostuserImage} >
                    <img src={Boy} alt='Homeuser' className={styles.HomepostuserImagelogo} />
                </div>
                <div className={styles.HomepostType}>
                    What's on your mind?...
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
        </div>
    )
}

export default HomePost