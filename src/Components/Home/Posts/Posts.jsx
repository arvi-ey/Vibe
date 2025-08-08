import React, { useEffect } from 'react'
import PostBox from './PostBox';
import styles from "./post.module.css"
import { useSelector } from 'react-redux';
import ProgressBar from '../../../Common/ProgressBar';
import usePost from '../../../Hooks/usePost';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Lottie from 'lottie-react';
import NoPost from "../../../assets/Animation/NoPost.json"


const Posts = () => {
    const { homeposts } = useSelector(state => state.post)
    const { loading } = usePost()
    const isMobile = useMediaQuery('(max-width:600px)');


    return (
        <div className={styles.postContainer} >
            {
                homeposts?.map((data, index) => {
                    return (
                        <PostBox
                            data={data}
                            keyValue={index}

                        />
                    )
                })

            }
            {
                homeposts?.length == 0 &&
                <div className={`h-[100%] w-[100%] flex justify-center flex-col items-center`} >
                    <Lottie
                        animationData={NoPost}
                        loop
                        autoplay
                        className={styles.NoPostAnimation}
                    />
                    <h1 className={`${styles.NoPostText}`} >No post available right now...</h1>
                </div>
            }
        </div>
    )
}

export default Posts