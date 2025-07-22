import React, { useEffect, useState } from 'react'
import FriendBox from './FriendBox'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import ScreenLoading from "../../Common/ScreenLoading"

const SentFriendRequests = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests } = useFriends()
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

    if (!sentFriends) {
        return (
            <ScreenLoading />
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
