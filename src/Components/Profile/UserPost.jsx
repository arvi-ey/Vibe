import React from 'react'
import CreateProfilePost from './CreateProfilePost'
import ProfilePost from './ProfilePost'
import { useSelector } from 'react-redux'

const UserPost = ({ userId }) => {
    const { user } = useSelector(state => state.user)
    return (
        <div className='lg:w-[60%] h-[full] gap-9 flex flex-col w-[100%] '>
            {user?.uid == userId &&
                <CreateProfilePost
                    userId={userId}
                />
            }
            <ProfilePost
                userId={userId}
            />
        </div>
    )
}

export default UserPost