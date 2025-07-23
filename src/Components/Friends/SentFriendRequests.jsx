import React, { useEffect, useState } from 'react'
import FriendBox from './FriendBox'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SentFriendRequests = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests, loading } = useFriends()
    const [sentFriends, setSentfriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const payload = {
                uid: user?.uid,
                type: "sender"
            }
            const data = await GetUserRequests(payload)
            setSentfriends(data)
        }
        getFriends()
    }, [user?.uid])

    if (loading) {
        return (
            <div className="flex flex-wrap gap-5 w-full ">
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
                sentFriends.map((data, index) => {
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

export default SentFriendRequests
