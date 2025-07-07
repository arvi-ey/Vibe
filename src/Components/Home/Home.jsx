import React from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import Story from './Story/Story'
import { useSelector } from 'react-redux'
import useAuth from '../../Hooks/useAuth'

const Home = () => {
    const { userId } = useSelector(state => state.auth)
    console.log(userId, "userId")
    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />

        </div>
    )
}

export default Home