import React from 'react'
import styles from "./home.module.css"
import HomePost from './HomePost'

const HomeMain = () => {
    return (
        <div className={styles.HomeMainContainer} >
            <HomePost />

        </div>
    )
}

export default HomeMain