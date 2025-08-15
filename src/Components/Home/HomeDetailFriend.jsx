import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useFriends from '../../Hooks/useFriend'
import useDate from '../../Hooks/useDate'
import HomeFriendDetailBox from './HomeFriendDetailBox'

const HomeDetailFriend = ({ friendquests, type }) => {

    const { user } = useSelector(state => state.user)










    return (
        <div className='w-[100%] h-auto p-5    flex flex-col gap-5'>
            {
                friendquests.length > 0 &&
                <p className={` font-semibold opacity-60 flex justify-between `} >
                    <span>

                        {
                            `
                        ${type == "request" ? "Friend requests" : "Suggested for you"}
                        `
                        }
                    </span>
                    {
                        type == "suggested" &&
                        <span className='text-xs font-bold text-blue-800 hover:text-blue-600 cursor-pointer'>Show All</span>
                    }
                </p>
            }
            <div className='flex flex-col gap-5'>

                {friendquests?.map((data, index) => {
                    return (
                        <HomeFriendDetailBox
                            data={data}
                            type={type}

                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default HomeDetailFriend