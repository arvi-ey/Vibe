import React, { useEffect } from 'react'
import HomeOptions from './HomeOptions'
import styles from "./home.module.css"
import HomeMain from './HomeMain'
import Story from './Story/Story'
import { useSelector } from 'react-redux'
import useUser from '../../Hooks/useUser'
import Loader from '../../Common/Loader'
import Backdrop from '@mui/material/Backdrop';


const Home = () => {
    const { userId } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const { GetUserByID, loading, error } = useUser()

    useEffect(() => {
        GetUserByID(userId)
    }, [userId])


    if (loading || !user) {
        return (
            <div className='w-full h-full flex justify-center items-center' >
                <Loader />
            </div>
        )
    }

    console.log(loading)

    return (
        <div className={styles.HomeContainer} >
            <HomeOptions />
            <HomeMain />

        </div>
    )
}

export default Home