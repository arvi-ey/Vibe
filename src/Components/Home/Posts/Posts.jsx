import React, { useEffect } from 'react'
import PostBox from './PostBox';
import styles from "./post.module.css"
import { useSelector } from 'react-redux';
import ProgressBar from '../../../Common/ProgressBar';
import usePost from '../../../Hooks/usePost';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';


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
                            key={index}

                        />
                    )
                })

            }
        </div>
    )
}

export default Posts