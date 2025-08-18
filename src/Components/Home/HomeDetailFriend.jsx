import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import useDate from '../../Hooks/useDate'
import HomeFriendDetailBox from './HomeFriendDetailBox'
import { useNavigate } from 'react-router'

const HomeDetailFriend = ({ friendquests, type }) => {
    const [friendRequestData, setFriendRequestdata] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        setFriendRequestdata(friendquests)
    }, [friendquests])

    return (
        <div className='w-[100%] h-auto p-5    flex flex-col gap-5'>
            {
                friendRequestData.length > 0 &&
                <p className={` font-semibold opacity-60 flex justify-between `} >
                    <span>

                        {
                            `
                        ${type == "request" ? "Friend requests" : "Suggested for you"}
                        `
                        }
                    </span>
                    {
                        type == "request" &&
                        <span className='text-xs font-bold text-blue-800 hover:text-blue-600 cursor-pointer'
                            onClick={() => navigate('/friends/request')}
                        >Show All</span>
                    }
                </p>
            }
            <div className='flex flex-col gap-5'>

                {friendRequestData?.map((data, index) => {
                    return (
                        <HomeFriendDetailBox
                            data={data}
                            type={type}
                            setFriendRequestdata={setFriendRequestdata}

                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default HomeDetailFriend