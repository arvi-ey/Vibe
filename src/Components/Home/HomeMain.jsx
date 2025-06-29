import React from 'react'
import styles from "./home.module.css"
import HomePost from './HomePost'
import Story from './Story/Story'

const HomeMain = () => {
    return (
        <div className={styles.HomeMainContainer} >
            <HomePost />
            <Story />

        </div>
    )
}

export default HomeMain