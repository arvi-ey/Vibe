import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import Button from '../../Common/Button'

const FriendBox = ({ data, keyValue }) => {
    console.log(data)
    return (
        <div className="w-40 h-60 shadow-xl sm:w-50 sm:h-70 flex flex-col items-center gap-2 bg-[var(--HOVER-BG)]  overflow-hidden rounded-lg cursor-pointer" key={keyValue}>
            <img src={data?.profile_image} alt="profile_image" className="w-full  rounded-lg h-[80%]  object-cover" />
            <p className='font-bold'>{data?.first_name} {data?.last_name} </p>
            <div className="cursor-pointer rounded-md h-10 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4">
                <SendIcon fontSize="small" sx={{ color: "white", opacity: 0.8 }} />
                <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                    Message
                </p>
            </div>

        </div>
    )
}

export default FriendBox