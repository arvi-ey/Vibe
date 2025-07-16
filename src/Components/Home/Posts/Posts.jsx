import React, { useEffect } from 'react'
import PostBox from './PostBox';
import styles from "./post.module.css"
import { useSelector } from 'react-redux';


const Posts = () => {
    const { homeposts } = useSelector(state => state.post)

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