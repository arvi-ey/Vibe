import React, { useEffect } from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import Story from './Story/Story'
import { useSelector } from 'react-redux'
import HomeDetail from './HomeDetail'


const Home = () => {
    const { user } = useSelector(state => state.user)





    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />
            <HomeDetail />
        </div>
    )
}

export default Home