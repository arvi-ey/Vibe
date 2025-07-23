import React, { useEffect } from 'react'
import useFriends from '../../Hooks/useFriend'
import { useSelector } from 'react-redux'
import FriendBox from './FriendBox'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const AllFriends = () => {
    const { user } = useSelector(state => state.user)
    const { friends } = useSelector(state => state.friend)
    const { GetUserFriends, loading } = useFriends()
    useEffect(() => {
        const getFriends = async () => {
            const payload = {
                uid: user?.uid
            }
            await GetUserFriends(payload)
        }
        getFriends()
    }, [user?.uid])

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

export default AllFriends