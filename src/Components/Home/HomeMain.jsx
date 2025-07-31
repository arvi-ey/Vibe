import React, { useEffect } from 'react'
import styles from "./home.module.css"
import HomePost from './HomePost'
import Story from './Story/Story'
import Posts from './Posts/Posts'
import { useSelector } from 'react-redux'
import usePost from '../../Hooks/usePost'
import ScreenLoading from '../../Common/ScreenLoading'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import postStyles from "./Posts/post.module.css"

const HomeMain = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { user } = useSelector(state => state.user)
    const { homeposts } = useSelector(state => state.post)

    const { GetHomePosts, loading } = usePost()



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


    // if (loading) {
    //     return (
    //         <div className={styles.postContainer}>
    //             {Array.from({ length: 5 }).map((_, index) => (
    //                 <Stack
    //                     key={index}
    //                     className={styles.postBox}
    //                     sx={{
    //                         width: '100%',
    //                         padding: '1em',
    //                         boxSizing: 'border-box',
    //                     }}
    //                 >


    //                     <Skeleton
    //                         variant="rectangular"
    //                         width="100%"
    //                         height={isMobile ? 200 : 400}
    //                         sx={{ borderRadius: "8px" }}
    //                     />

    //                     <Skeleton variant="text" width="100%" height={40} />
    //                 </Stack>
    //             ))}
    //         </div>
    //     );
    // }



    return (
        <div className={styles.HomeMainContainer} >
            <HomePost />
            {
                loading &&
                <div className={postStyles.postContainer}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Stack
                            key={index}
                            className={postStyles.postBox}
                            sx={{
                                width: '100%',
                                padding: '1em',
                                boxSizing: 'border-box',
                            }}
                        >


                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={isMobile ? 200 : 400}
                                sx={{ borderRadius: "8px" }}
                            />

                            <Skeleton variant="text" width="100%" height={40} />
                        </Stack>
                    ))}
                </div>
            }
            <Posts />

        </div>
    )
}

export default HomeMain