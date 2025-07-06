import React from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import Story from './Story/Story'

const Home = () => {
    // console.log("INSIDE HOME PAGE")
    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />

        </div>
    )
}

export default Home