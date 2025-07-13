import React from 'react'
import UserInfo from './UserInfo'
import UserPost from './UserPost'
import { useSelector } from 'react-redux'

const About = () => {
    const { user } = useSelector(state => state.user)
    return (
        <div className='w-[100%] pb-11 flex-col gap-5 flex flex-wrap lg:flex-row lg:justify-between items-center lg:items-start' >
            <UserInfo
                user={user}
            />
            <UserPost
                user={user}

            />

        </div>
    )
}

export default About