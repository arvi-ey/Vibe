import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import useDate from '../../Hooks/useDate'

const HomeDetailFriend = ({ friendquests }) => {
    const [friendRequestArray, setFriendRequestArray] = useState([])
    const { HandleFriends } = useFriends()

    useEffect(() => {
        setFriendRequestArray(friendquests)
    }, [friendquests])

    const { DateForMat } = useDate()

    const handleFriendRequest = async (status, id, sender, receiver) => {

        let payloadObj = {
            id,
            sender,
            receiver,
            status: status,
            sent_time: Date.now()
        }
        const result = await HandleFriends(payloadObj)
        if (result?.id) {
            setFriendRequestArray(friendRequestArray.filter(data => data.id != result?.id))
        }

    }




    return (
        <div className='w-[100%] flex flex-col gap-5'>
            {
                friendRequestArray.length > 0 &&
                <p className={` font-semibold opacity-60 `} >Friend requests</p>
            }
            <div>
                {
                    friendRequestArray?.map((data, index) => {
                        return (
                            <div className='flex gap-2 items-center'>
                                <img src={data?.profile_image} className='size-12 rounded-full cursor-pointer' />
                                <div>
                                    <p className='opacity-70 font-bold cursor-pointer hover:opacity-80'>{data?.first_name} {data?.last_name} </p>
                                    <p className='opacity-50 font-semibold text-xs'>{DateForMat(data?.sent_time)} </p>
                                </div>
                                <div className={`p-2 bg-[var(--PRIMARY-COLOR)] rounded-lg cursor-pointer hover:bg-[var(--SECONDARY-cOLOR)]`} onClick={() => handleFriendRequest('received', data?.id, data?.sender, data?.receiver)}>
                                    <span className={`text-white font-semibold`}>Confirm</span>
                                </div>
                                <div className={`p-2 rounded-lg cursor-pointer  bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)]`} onClick={() => handleFriendRequest('not')}>
                                    <span className={`text-black font-semibold`}>Cancel</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomeDetailFriend