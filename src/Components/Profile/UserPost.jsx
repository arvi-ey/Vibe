import React from 'react'
import CreateProfilePost from './CreateProfilePost'
import ProfilePost from './ProfilePost'

const UserPost = ({ userId }) => {
    return (
        <div className='lg:w-[60%] h-[full] gap-9 flex flex-col w-[100%] '>
            <CreateProfilePost
                userId={userId}
            />
            <ProfilePost
                userId={userId}
            />
        </div>
    )
}

export default UserPost