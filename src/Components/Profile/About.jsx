import React from 'react'
import UserInfo from './UserInfo'
import UserPost from './UserPost'
import { useSelector } from 'react-redux'
import { useOutletContext } from "react-router-dom";
import Loader from '../../Common/Loader';
const About = () => {
    const { user } = useSelector(state => state.user)
    const { userId } = useOutletContext();
    const { profileInfo } = useSelector(state => state.profile)

    if (!profileInfo || !userId) {
        return (
            <Loader />
        )
    }

    return (
        <div className='w-[100%] pb-11 flex-col gap-5 flex flex-wrap lg:flex-row lg:justify-between items-center lg:items-start' >
            <UserInfo
                user={profileInfo}
            />
            <UserPost
                user={profileInfo}
                userId={userId}

            />

        </div>
    )
}

export default About