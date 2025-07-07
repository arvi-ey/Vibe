import React from 'react'
import styles from "./story.module.css"

const StoryBox = ({ data }) => {
    return (
        <div className={styles.storyBoxContainer} key={data?.id}
        >
            <img src={data?.image} alt="Storyimage" className={styles.userStory} />
            <img src={data?.profileImage} alt='UploaderProfileimage' className={styles.UploaderProfileimage} />
            <div className={styles.UserName} >{data?.name}</div>
        </div>
    )
}

export default StoryBox