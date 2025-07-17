import React, { useEffect } from 'react'
import PostBox from './PostBox';
import styles from "./post.module.css"
import { useSelector } from 'react-redux';
import ProgressBar from '../../../Common/ProgressBar';
import usePost from '../../../Hooks/usePost';


const Posts = () => {
    const { homeposts } = useSelector(state => state.post)
    const { loading } = usePost()

    return (
        <div className={styles.postContainer} >
            {
                loading &&
                <ProgressBar />
            }
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