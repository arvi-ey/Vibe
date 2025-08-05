import React, { useEffect } from 'react'
import { useParams, NavLink, Outlet } from 'react-router-dom';

import ProfileCover from './ProfileCover';
import useProfile from '../../Hooks/useProfile';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader';
import Skeleton from '@mui/material/Skeleton';

const UserProfile = () => {
    const { userId } = useParams()
    const { GetUserProfileData, loading } = useProfile()
    const { profileInfo } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.user)



    useEffect(() => {
        GetUserProfileData(userId)
    }, [userId])

    // console.log(user)

    if (loading || !profileInfo || !user) {
        // if (true) {
        return (
            <div className='w-full h-full flex gap-8 flex-col justify-center items-center' >
                <div
                    className='h-96 w-[90%] min-w-4xs max-w-5xl rounded-xl  relative'
                    style={{ marginTop: "60px" }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        animation="wave"
                        style={{
                            display: 'inline-block',
                            borderRadius: '0.75rem'
                        }}
                    />

                </div>
                <div
                    className='h-96 w-[90%] flex min-w-4xs justify-between max-w-5xl rounded-xl overflow-hidden relative'
                >


                    <Skeleton
                        variant="rectangular"
                        width="40%"
                        height="100%"
                        style={{
                            display: 'inline-block',
                            borderRadius: '0.75rem'
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width="50%"
                        height="40%"
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
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <ProfileCover profileInfo={profileInfo} />
            <div className="w-[90%] max-w-5xl mt-6 flex h-16 items-center  gap-6 ">
                <NavLink
                    to='.'
                    end
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600  border-b-2 border-blue-600 pb-2 font-bold' : 'pb-2 font-semibold'
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="photos"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2 font-bold' : 'pb-2 font-semibold'
                    }
                >
                    Photos
                </NavLink>
                <NavLink
                    to="friends"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-2 font-bold' : 'pb-2 font-semibold'
                    }
                >
                    Friends
                </NavLink>
            </div>
            <div className="w-[90%] max-w-5xl mt-6">
                <Outlet context={{ userId }} />
            </div>
        </div>
    );

}

export default UserProfile