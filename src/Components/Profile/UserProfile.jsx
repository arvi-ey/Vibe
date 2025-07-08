import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProfileCover from './ProfileCover';
import useProfile from '../../Hooks/useProfile';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';

const UserProfile = () => {
    const { userId } = useParams()
    const { GetUserProfileData, loading } = useProfile()
    const { profileInfo } = useSelector(state => state.profile)


    useEffect(() => {
        GetUserProfileData(userId)
    }, [userId])

    if (loading || !profileInfo) {
        return (
            <div className='w-full h-full flex justify-center items-center' >
                <Loader />
            </div>
        )
    }
    return (
        <div className='w-full h-full flex justify-center' >
            <ProfileCover
                profileInfo={profileInfo}
            />

        </div>
    )
}

export default UserProfile