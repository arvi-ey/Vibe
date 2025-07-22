import React, { useEffect } from 'react'
import useFriends from '../../Hooks/useFriend'
import { useSelector } from 'react-redux'
import FriendBox from './FriendBox'
import ScreenLoading from "../../Common/ScreenLoading"

const AllFriends = () => {
    const { user } = useSelector(state => state.user)
    const { friends } = useSelector(state => state.friend)
    const { GetUserFriends } = useFriends()
    useEffect(() => {
        const getFriends = async () => {
            const payload = {
                uid: user?.uid
            }
            await GetUserFriends(payload)
        }
        getFriends()
    }, [user?.uid])

    if (!friends) {
        return (
            <ScreenLoading />
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