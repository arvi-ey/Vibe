import React, { useState, useEffect } from 'react'
import FriendBox from './FriendBox'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import ScreenLoading from "../../Common/ScreenLoading"

const FriendRequests = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests } = useFriends()
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

    if (!friendquests) {
        return (
            <ScreenLoading />
        )
    }
    return (
        <div className="flex flex-wrap gap-5 w-screen h-screen ">
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