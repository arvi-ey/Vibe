import React from 'react'
import { useParams, NavLink, Outlet } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CakeIcon from '@mui/icons-material/Cake';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
const HomeFriends = () => {
    const [openMenu, setOpenmenu] = useState(false)
    const FriendsNavArr = [
        {
            path: ".",
            title: "All Friends",
            icon: <PeopleAltIcon sx={{ opacity: "0.7 !important", fontSize: 'medium' }} />
        },
        {
            path: "request",
            title: "Friend Requests",
            icon: <GroupAddIcon sx={{ opacity: "0.7 !important", fontSize: 'medium' }} />
        },
        {
            path: "sent",
            title: "Sent Requests",
            icon: <PersonAddIcon sx={{ opacity: "0.7 !important", fontSize: 'medium' }} />
        },
        {
            path: "birthday",
            title: "Birthdays",
            icon: <CakeIcon sx={{ opacity: "0.7 !important", fontSize: 'medium' }} />
        },
    ]
    const HandelOpenMenu = () => {
        setOpenmenu(!openMenu)
    }
    return (
        <div className='flex gap-10'>
            <div className=' sm:w-60 hidden  w-screen sm:h-screen  sm:flex flex-col gap-5' style={{ marginTop: "60px" }} >
                {FriendsNavArr?.map((data, index) => {
                    return (
                        <NavLink
                            to={data?.path}
                            end
                            className={({ isActive }) =>
                                isActive ? 'font-bold  rounded-lg' : 'pb-2 font-semibold'
                            }
                            style={{ paddingLeft: "10px" }}>
                            <div className={`w-full sm:h-12 flex items-center justify-between rounded-lg hover:bg-[var(--HOVER-BG)] ${({ isActive }) => isActive && 'bg-[var(--HOVER-BG)]'} `} style={{ paddingLeft: "10px" }}>
                                <div className='flex w-[90%]  gap-3 items-center'>
                                    <div className='size-8 bg-[#E6E8EA] rounded-full flex justify-center items-center' >
                                        {data?.icon}
                                    </div>
                                    <p className='text-[10px] sm:text-sm'>
                                        {data?.title}
                                    </p>
                                </div>
                                <div className='sm:block hidden'>
                                    <ArrowForwardIosIcon sx={{ opacity: "0.7 !important", fontSize: 'small' }} />
                                </div>
                            </div>
                        </NavLink>
                    )
                })}

            </div>
            <div className={`flex flex-col sm:hidden gap-2 bg z-[40] ${openMenu && 'absolute bg-[#E3E4E6] rounded-lg'}`} style={{ marginTop: "50px", }} >
                <div className={`cursor-pointer  w-full  flex ${openMenu && 'justify-end mr-7'}`} style={{ marginTop: "10px", }} onClick={HandelOpenMenu}>
                    <div className={`size-10 flex justify-center items-center rounded-full  hover:bg-[var(--HOVER-BG)]  ${openMenu && 'mr-7'}`} style={openMenu ? { marginRight: "10px" } : { marginLeft: "10px" }}>
                        {
                            openMenu ?

                                <MenuOpenIcon />
                                :
                                <MenuIcon />
                        }
                    </div>
                </div>

                {
                    openMenu &&
                    <div className=' w-60 h-screen  flex flex-col gap-5 '  >
                        {FriendsNavArr?.map((data, index) => {
                            return (
                                <NavLink
                                    to={data?.path}
                                    end
                                    onClick={() => setOpenmenu(!openMenu)}
                                    className={({ isActive }) =>
                                        isActive ? 'text-blue-600 pb-2 font-bold' : 'pb-2 font-semibold'
                                    }
                                    style={{ paddingLeft: "10px" }}>
                                    <div className='w-full h-12 flex items-center justify-between rounded-lg hover:text-blue-600' style={{ paddingLeft: "10px" }}>
                                        <div className='flex w-[90%]  gap-3 items-center'>
                                            <div className='size-10 bg-[var(--HOVER-BG)] rounded-full flex justify-center items-center' >
                                                {data?.icon}
                                            </div>
                                            <p className='text-[10px] text-lg'>
                                                {data?.title}
                                            </p>
                                        </div>
                                        <div className='sm:block hidden'>
                                            <ArrowForwardIosIcon sx={{ opacity: "0.7 !important" }} />
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })}

                    </div>
                }
            </div>
            <div className='sm:w-96 w-screen h-screen'>
                <Outlet />
            </div>
        </div >
    )
}

export default HomeFriends