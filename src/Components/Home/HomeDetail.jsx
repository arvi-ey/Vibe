import React from 'react'
import { Search } from "lucide-react";
import styles from "./home.module.css"
const HomeDetail = () => {
    return (
        <div className={`flex  flex-col gap-3 items-center ${styles.home_detail_container} `}>
            <div className="w-full flex justify-center p-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-4 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm placeholder-gray-500"
                    />
                </div>
            </div>
            <div className={`flex pl-10 flex-col gap-2 w-[100%]`}>
                <p className={` font-bold md:text-lg lg:text-xl  opacity-60 `} >Subscribe to Premium</p>
                <p className={` font-semibold md:text-xs lg:text-sm  opacity-60 `}>Subscribe to unlock new features and if eligible, receive a share of revenue.
                    <span className={`text-[#0000FF] cursor-pointer text-xs hover:text-[var(--PRIMARY-COLOR)]`}> See more...</span>
                </p>
                <div className={`w-50 p-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] cursor-pointer rounded-2xl flex justify-center items-center`}>
                    <span className={`font-semibold text-white`} >Subscribe</span>
                </div>
            </div>
            <div className={` pl-10 flex flex-col  w-[100%]`}>
                <p className={` font-semibold opacity-60 `} >Suggested for you</p>

            </div>
        </div>
    )
}

export default HomeDetail