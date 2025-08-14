import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react";
import styles from "./home.module.css"
import HomeSearchBar from './HomeSearchBar';
import useFriends from '../../Hooks/useFriend'
import { useSelector } from 'react-redux';
import HomeDetailFriend from './HomeDetailFriend';
const HomeDetail = () => {
    const { user } = useSelector(state => state.user)
    const { GetUserRequests, loading } = useFriends()
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

    return (
        <div className={`flex  flex-col gap-3 items-center ${styles.home_detail_container} `}>
            <HomeSearchBar />
            <div className={`flex pl-10 flex-col gap-2 w-[100%]`}>
                <p className={` font-bold md:text-lg lg:text-xl  opacity-60 `} >Subscribe to Premium</p>
                <p className={` font-semibold md:text-xs lg:text-sm  opacity-60 `}>Subscribe to unlock new features and if eligible, receive a share of revenue.
                    <span className={`text-[#0000FF] cursor-pointer text-xs hover:text-[var(--PRIMARY-COLOR)]`}> See more...</span>
                </p>
                <div className={`w-50 p-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] cursor-pointer rounded-2xl flex justify-center items-center`}>
                    <span className={`font-semibold text-white`} >Subscribe</span>
                </div>
            </div>
            {
                friendquests.length > 0 &&
                <div className={` pl-10 flex flex-col  w-[100%]`}>
                    <HomeDetailFriend friendquests={friendquests} />

                </div>
            }
        </div>
    )
}

export default HomeDetail