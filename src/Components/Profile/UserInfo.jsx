import React from 'react'
import { useSelector } from 'react-redux'
import Graduation from "../../assets/graduation.png"
import Heart from "../../assets/heart.png"
import City from "../../assets/city.png"
import Job from "../../assets/job.png"
import Marker from "../../assets/marker.png"


const UserInfo = ({ user }) => {

    return (
        <div className='lg:w-[36%] w-[90%] shadow:lg flex flex-col gap-2' style={{ paddingBottom: "20px" }} >
            <h1 className='font-bold text-xl'>Intro</h1>
            <div className='w-full flex justify-center items-center'>
                <p className='font-semibold text-black opacity-70'>
                    {user?.bio}
                </p>
            </div>
            <div className='w-[100%] h-10 bg-[#E6E8EA] cursor-pointer hover:bg-[#dfe1e3] flex justify-center items-center rounded-lg'>
                <p className='font-semibold'>Edit Bio</p>
            </div>
            <div className='w-full flex flex-col gap-6' >
                <div className='w-[100%] flex gap-3 items-center'>
                    <img src={Job} alt='job-image' className='size-5' />
                    <div className='flex gap-2'>
                        <p>{user?.profession}</p>
                        <p className='font-bold cursor-pointer  '>{user?.company_name}</p>
                    </div>
                </div>
                <div className='w-[100%] h-12 flex gap-3 items-start '>
                    <img src={Graduation} alt='job-image' className='size-5 mt-3' style={{ marginTop: "5px" }} />
                    <p className={`font-medium items-center`}>Studied at {user?.high_school}</p>
                </div>
                <div className='w-[100%] flex gap-3 items-center'>
                    <img src={Heart} alt='job-image' className='size-5' />
                    <div className='flex gap-2'>
                        <p>Relationship</p>
                        <p className='font-bold cursor-pointer  '>{user?.relationship_status}</p>
                    </div>
                </div>
                <div className='w-[100%] flex gap-3 items-center'>
                    <img src={City} alt='job-image' className='size-5' />
                    <div className='flex gap-2'>
                        <p>Lives in</p>
                        <p className='font-bold cursor-pointer  '>{user?.city}</p>
                    </div>
                </div>
                <div className='w-[100%] flex gap-3 items-center'>
                    <img src={Marker} alt='job-image' className='size-5' />
                    <div className='flex gap-2'>
                        <p>From</p>
                        <p className='font-bold cursor-pointer  '>{`${user?.state || ""} ${user?.state ? "," : " "}  ${user?.country}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo