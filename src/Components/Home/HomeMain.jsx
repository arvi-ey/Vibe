import React from 'react'
import styles from "./home.module.css"
import HomePost from './HomePost'
import Story from './Story/Story'
import Posts from './Posts/Posts'

const HomeMain = () => {
    return (
        <div className={styles.HomeMainContainer} >
            <HomePost />
            <Story />
            <Posts />

        </div>
    )
}

export default HomeMain