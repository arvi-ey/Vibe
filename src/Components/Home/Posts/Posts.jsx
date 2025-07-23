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

    if (loading) {
        return (
            <div className={styles.postContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Stack
                        key={index}
                        className={styles.postBox}
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
        );
    }


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