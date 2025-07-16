import React, { useEffect } from 'react'
import PostBox from '../Home/Posts/PostBox'
import { useSelector } from 'react-redux'
import usePost from '../../Hooks/usePost'

const ProfilePost = ({ userId }) => {
    const { profileposts } = useSelector(state => state.profile)
    const { GetProfilePosts, loading } = usePost()

    useEffect(() => {
        GetProfilePosts(userId)
    }, [userId])

    return (
        <div className='flex flex-col w-[100%] justify-between gap-2.5' >
            {
                profileposts?.map((data, index) => {
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

export default ProfilePost