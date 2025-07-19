import React, { useEffect } from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import Story from './Story/Story'
import { useSelector } from 'react-redux'
import useUser from '../../Hooks/useUser'
import Loader from '../../Common/Loader'
import Backdrop from '@mui/material/Backdrop';
import ScreenLoading from '../../Common/ScreenLoading'


const Home = () => {
    const { user } = useSelector(state => state.user)





    if (!user) {
        return (
            <ScreenLoading />
        )
    }

    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />

        </div>
    )
}

export default Home