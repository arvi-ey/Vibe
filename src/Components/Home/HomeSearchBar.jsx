import React from 'react'
import styles from "./home.module.css"
import { Search } from "lucide-react";
const HomeSearchBar = () => {
    return (
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
    )
}

export default HomeSearchBar