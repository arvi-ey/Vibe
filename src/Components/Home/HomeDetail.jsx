import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react";
import styles from "./home.module.css"
import HomeSearchBar from './HomeSearchBar';
import useFriends from '../../Hooks/useFriend'
import { useSelector } from 'react-redux';
import HomeDetailFriend from './HomeDetailFriend';
const HomeDetail = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests, GetUserSuggesition, loading } = useFriends()
    const [friendquests, setfriendquests] = useState([])
    const [suggesition, setsuggesition] = useState([])

    useEffect(() => {

        const getFriends = async () => {
            const suggesition = await GetUserSuggesition({ uid: user.uid })
            setsuggesition(suggesition)
            const payload = {
                uid: user?.uid,
                type: "receiver",
                limit: 5
            }
            const data = await GetUserRequests(payload)
            setfriendquests(data)
        }
        getFriends()
    }, [user?.uid])

    return (
        <div className={`flex  flex-col  items-center ${styles.home_detail_container} `}>
            <HomeSearchBar />
            {
                suggesition.length > 0 &&
                <div className={`flex flex-col  w-[100%]`}>
                    <HomeDetailFriend
                        friendquests={suggesition}
                        type="suggested"
                    />

                </div>
            }
            {
                friendquests.length > 0 &&
                <div className={`flex flex-col  w-[100%]`}>
                    <HomeDetailFriend
                        friendquests={friendquests}
                        type="request"
                    />

                </div>
            }
            {/* <div className={`flex pl-10 flex-col gap-2 w-[100%]`}>
                <p className={` font-bold md:text-lg lg:text-xl  opacity-60 `} >Subscribe to Premium</p>
                <p className={` font-semibold md:text-xs lg:text-sm  opacity-60 `}>Subscribe to unlock new features and if eligible, receive a share of revenue.
                    <span className={`text-[#0000FF] cursor-pointer text-xs hover:text-[var(--PRIMARY-COLOR)]`}> See more...</span>
                </p>
                <div className={`w-50 p-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] cursor-pointer rounded-2xl flex justify-center items-center`}>
                    <span className={`font-semibold text-white`} >Subscribe</span>
                </div>
            </div> */}
        </div>
    )
}

export default HomeDetail