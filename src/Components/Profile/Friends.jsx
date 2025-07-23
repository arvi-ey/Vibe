import React, { useEffect } from 'react'
import useFriends from '../../Hooks/useFriend';
import { useSelector } from 'react-redux'
import FriendBox from '../Friends/FriendBox';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useOutletContext } from 'react-router';
import Lottie from 'lottie-react';
import NoFriend from "../../assets/Animation/NoFriend.json"

const Friends = () => {
    const { user } = useSelector(state => state.user)
    const { friends } = useSelector(state => state.friend)
    const { GetUserFriends, loading } = useFriends()
    const { userId } = useOutletContext();
    const { profileInfo } = useSelector(state => state.profile)

    useEffect(() => {
        const getFriends = async () => {
            const payload = {
                uid: userId || profileInfo.uid
            }
            await GetUserFriends(payload)
        }
        getFriends()
    }, [profileInfo, userId])

    if (loading) {
        return (
            <div className="flex flex-wrap gap-5  w-screen">

                {
                    Array.from({ length: 10 }).map((_, index) => {
                        return (
                            <Stack spacing={1} sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }} key={index}>
                                <Skeleton variant="rectangular" width={210} height={180} sx={{ borderRadius: "5px" }} />
                                <Skeleton variant="rectangular" width={210} height={25} sx={{ borderRadius: "5px" }} />
                            </Stack>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className="flex flex-wrap gap-5 w-screen h-screen ">
            {
                friends?.length == 0 &&
                <div className='w-screen flex' >
                    <Lottie
                        animationData={NoFriend}
                        loop
                        autoplay
                        style={{ width: '250px', height: '250px' }}
                    />
                    {user?.uid == profileInfo?.uid ?
                        <p className='font-bold opacity-70 text-lg'>{`Your friend list is empty`}</p>
                        :
                        <p className='font-bold opacity-70 text-lg'>{`${profileInfo?.first_name} ${profileInfo?.last_name}'s friend list is empty`}</p>
                    }
                </div>

            }

            {
                friends.map((data, index) => {
                    return (

                        <FriendBox
                            data={data}
                            keyValue={data.id}
                        />
                    )
                })
            }
        </div>
    )
}

export default Friends