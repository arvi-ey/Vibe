import React, { useEffect } from 'react'
import styles from "./home.module.css"
import HomePost from './HomePost'
import Story from './Story/Story'
import Posts from './Posts/Posts'
import { useSelector } from 'react-redux'
import usePost from '../../Hooks/usePost'

const HomeMain = () => {
    const { user } = useSelector(state => state.user)
    const { homeposts } = useSelector(state => state.post)

    const { GetHomePosts } = usePost()

    useEffect(() => {
        if (user) {
            const obj = {
                country: user?.country,
                city: user?.city,
                state: user?.city,
            }
            GetHomePosts(obj)
        }
    }, [user])

    return (
        <div className={styles.HomeMainContainer} >
            <HomePost />
            <Story />
            <Posts
                homeposts={homeposts}
            />

        </div>
    )
}

export default HomeMain