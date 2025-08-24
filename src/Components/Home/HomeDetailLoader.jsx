import React from 'react'
import styles from "./home.module.css"
import Skeleton from '@mui/material/Skeleton';
const HomeDetailLoader = () => {
    return (
        <div className={`flex flex-col  items-center ${styles.home_detail_container} `}>
            <div className="w-full flex justify-center p-4 relative  flex-col gap-6">
                <Skeleton variant="rectangular" sx={{ width: "100%", height: "45px", borderRadius: "20px" }} animation="wave" />
                {
                    Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <div className='flex items-center gap-2' >
                                <Skeleton variant="circular" width={50} height={50} animation="wave" />
                                <Skeleton variant="rectangular" sx={{ width: "80%", height: "40px", borderRadius: "15px" }} animation="wave" />
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default HomeDetailLoader