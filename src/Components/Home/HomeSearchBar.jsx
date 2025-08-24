import React, { useEffect, useState } from 'react'
import styles from "./home.module.css"
import { Search, CircleX } from "lucide-react";
const HomeSearchBar = ({ searchtext, setSearchText, setFocusSearch, focusSearch, setsearchCached }) => {

    const OnSearchUser = (e) => {
        const { value } = e.target
        setSearchText(value)
    }
    const OnCancelSearch = () => {
        setSearchText("")
    }

    return (
        <div className="w-full flex justify-center p-4 relative">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchtext}
                    className="w-full pl-10 pr-4 py-4 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm placeholder-gray-500"
                    onChange={(e) => OnSearchUser(e)}
                    onFocus={() => {
                        const data = localStorage.getItem("search")
                        setsearchCached(JSON.parse(data))
                        setFocusSearch(!focusSearch)

                    }
                    }
                    onBlur={() => setFocusSearch(!focusSearch)}
                />
                {
                    searchtext?.length > 0 &&
                    <CircleX className=" cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} onClick={OnCancelSearch} />
                }
            </div>

        </div>
    )
}

export default HomeSearchBar