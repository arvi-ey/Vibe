import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useDate from '../../Hooks/useDate'
import useFriends from '../../Hooks/useFriend'

const HomeFriendDetailBox = ({ data, type, setFriendRequestdata }) => {

    const { user } = useSelector(state => state.user)
    const { DateForMat } = useDate()
    const { HandleFriends } = useFriends()
    const [sentrequest, setSentrequest] = useState(false)
    const [friends, setFriends] = useState(false)
    const [userData, setuserData] = useState()


    useEffect(() => {
        setuserData(data)
        if (type == "request" && data.status == "sent") {
            setFriends(false)
        }

    }, [data, type])



    const handleFriendRequest = async (status) => {
        if (status == "received" && type == "request") {
            setFriends(true)
        }
        if (type == "request" && status == "not") {
            setFriendRequestdata(prev => prev.filter(item => item.id !== data.id));
        }
        if (status == "not") {
            setSentrequest(!sentrequest)
        }
        let payloadObj
        if (status == 'sent') {
            setSentrequest(!sentrequest)
            payloadObj = {
                sender: user?.uid,
                receiver: userData?.uid,
                status: status,
                sent_time: Date.now()
            }
        }
        else {
            payloadObj = {
                id: userData?.id,
                sender: userData?.sender,
                receiver: userData.receiver,
                status: status,
                sent_time: Date.now()
            }
        }
        const result = await HandleFriends(payloadObj)
        if (status == "sent") {
            setuserData(prev => ({ ...prev, id: result.id, sender: result.sender, receiver: result.receiver }));
        }


    }

    return (
        <div className='flex gap-2 items-center' key={userData?.uid}>
            <img src={userData?.profile_image} className='size-10 rounded-full cursor-pointer' />
            <div className='w-[40%]'>
                <p className='opacity-70 font-bold text-sm cursor-pointer hover:opacity-80'>{userData?.first_name} {userData?.last_name} </p>
                {
                    type == "request" ?
                        <p className='opacity-50 font-semibold text-xs'>{DateForMat(userData?.sent_time)} </p> :
                        <p className='opacity-50 font-semibold text-xs'> Suggested for you</p>
                }
            </div>
            {
                type == "request" && friends == false ?
                    <div className={`p-2 text-xs bg-[var(--PRIMARY-COLOR)] rounded-sm cursor-pointer hover:bg-[var(--SECONDARY-cOLOR)]`} onClick={() => handleFriendRequest('received')}>
                        <span className={`text-white font-semibold`}>Confirm</span>

                    </div>
                    :
                    <>
                        {!sentrequest && !friends ?
                            <div className={`p-2 text-xs bg-[var(--PRIMARY-COLOR)] rounded-sm cursor-pointer hover:bg-[var(--SECONDARY-cOLOR)]`} onClick={() => handleFriendRequest('sent', userData?.uid, userData?.sender, userData?.receiver)}>
                                <span className={`text-white font-semibold`}>Add Friend</span>

                            </div>

                            :
                            sentrequest && !friends ?
                                <div className={`p-2 text-xs rounded-sm cursor-pointer  bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] `} onClick={() => handleFriendRequest('not')}>
                                    <span className={` font-semibold`}>Cancel request</span>

                                </div>
                                :
                                null
                        }
                    </>
            }
            {
                (type == "request" && friends) &&
                <div className={`p-2 text-xs rounded-sm cursor-pointer  bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] `} onClick={() => handleFriendRequest('not')}>
                    <span className={` font-semibold`}>Friends</span>

                </div>
            }
            {
                (type == "request" && friends == false) &&
                <div className={`p-2 text-xs rounded-sm cursor-pointer  bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)]`} onClick={() => handleFriendRequest('not')}>
                    <span className={`text-black font-semibold`}>Remove</span>
                </div>
            }
        </div>


    )
}

export default HomeFriendDetailBox