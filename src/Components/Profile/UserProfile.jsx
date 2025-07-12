import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProfileCover from './ProfileCover';
import useProfile from '../../Hooks/useProfile';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';
import Skeleton from '@mui/material/Skeleton';

const UserProfile = () => {
    const { userId } = useParams()
    const { GetUserProfileData, loading } = useProfile()
    const { user } = useSelector(state => state.user)


    useEffect(() => {
        GetUserProfileData(userId)
    }, [userId])

    if (loading || !user) {
        return (
            <div className='w-full h-full flex flex-col justify-center items-center' >
                <div
                    className='h-96 w-[90%] min-w-4xs max-w-5xl rounded-xl overflow-hidden relative'
                    style={{ marginTop: "60px" }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        style={{
                            display: 'inline-block',
                            borderRadius: '0.75rem'
                        }}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className='w-full h-full flex flex-col justify-center items-center' >
            <ProfileCover
                profileInfo={user}
            />
        </div>
    )
}

export default UserProfile