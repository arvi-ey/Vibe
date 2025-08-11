import React, { useState, useEffect } from 'react'
import FriendBox from './FriendBox'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Lottie from 'lottie-react';
import EmptyFriend from "../../assets/Animation/empty_friend.json"

const FriendRequests = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests, loading } = useFriends()
    const [friendquests, setfriendquests] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const payload = {
                uid: user?.uid,
                type: "receiver"
            }
            const data = await GetUserRequests(payload)
            setfriendquests(data)
        }
        getFriends()
    }, [user?.uid])

    if (loading) {
        return (
            <div className="flex flex-wrap gap-5 w-screen ">
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
                friendquests.length == 0 &&
                <div className={`h-[100%]  w-96 flex justify-center flex-col items-center`} >
                    <Lottie
                        animationData={EmptyFriend}
                        loop
                        autoplay
                        className={`size-80`}
                    />
                    <h1 className={`font-bold opacity-75`} >No data Found</h1>
                </div>
            }
            {
                friendquests.map((data, index) => {
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

export default FriendRequests