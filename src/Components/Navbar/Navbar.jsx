import React from 'react'
import styles from "./nav.module.css"
import Logo from "../../assets/logo.svg"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { NavLink } from 'react-router-dom';
import Notification from "../../assets/notification.svg"
import Message from "../../assets/message.svg"
import Settings from "../../assets/settings.svg"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Box } from '@mui/system';
import useSignOut from '../../Hooks/useSignOut';
import { useDispatch, useSelector } from 'react-redux';
import { AddUserID } from '../../Redux/Slices/authSlicer';
import { useNavigate } from 'react-router-dom';
import { AddUserdata } from '../../Redux/Slices/userSlicer';
import DemoUser from "../../assets/demo-user.png"
import reels from "../../assets/reels.png"
import Saved from "../../assets/Saved.png"
import memories from "../../assets/memories.png"
import following from "../../assets/following.png"
import Groups from "../../assets/Groups.png"
import HomeSearchBar from '../Home/HomeSearchBar';
import { useState } from 'react';
const Navbar = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = useSelector(state => state.user)
    const { UserSignOut } = useSignOut()
    const [searchtext, setSearchText] = useState("")
    const [focusSearch, setFocusSearch] = useState(false)
    const navigate = useNavigate()


    const Navarray = [
        {
            title: "Home",
            icon: <HomeRoundedIcon />,
            path: "/"
        },
        {
            title: "Shorts",
            icon: <StorefrontRoundedIcon />,
            path: "/shorts"
        },
    ];


    const User_Array = [
        {
            title: "Message",
            icon: Message
        },
        {
            title: "Notification",
            icon: Notification
        },
        {
            title: "Account",
            icon: Settings
        },
    ]

    const InfoArray = [
        {
            title: "Settings",
            icon: <SettingsIcon fontSize='small' />
        },
        {
            title: "Help & Support",
            icon: <HelpIcon fontSize='small' />
        },
        {
            title: "Display & accessibility",
            icon: <DarkModeIcon fontSize='small' />
        },
        {
            title: "Log out",
            icon: <LogoutIcon fontSize='small' />
        }
    ]
    const HomeOptionArray = [
        {
            title: "Friends",
            img: following,
            path: '/friends'

        },
        {
            title: "Groups",
            img: Groups

        },
        {
            title: "Reels",
            img: reels

        }]


    const handleClick = (e, index, title) => {
        if (title == "Account") setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const HandleInfoArray = async (title) => {
        if (title == "Log out") {
            const signOutResponse = await UserSignOut()
            if (signOutResponse?.statuCode == 200) {
                dispatch(AddUserdata(null))
                navigate("/signin")
            }
        }
    }


    return (
        <div className={styles.Layout_container}>
            <div className={styles.navdiv1}>
                <img src={user?.profile_image || DemoUser} alt='Homeuser' className={`size-10 rounded-full cursor-pointer ${styles.userImage}`} onClick={() => { navigate(`/profile/${user?.uid}`) }} />
                <img src={Logo} alt='Logo' className={`cursor-pointer size-10 ${styles.Logo_Image}`} onClick={() => navigate("/")} />
                {/* <div className='w-full relative flex flex-col items-center'>

                    <HomeSearchBar
                        searchtext={searchtext}
                        setSearchText={setSearchText}
                        setFocusSearch={setFocusSearch}
                        focusSearch={focusSearch}


                    />
                    {
                        focusSearch &&
                        <div className={`w-[90%] p-4 rounded-lg absolute bg-[var(--HOVER-BG)] h-auto min-h-24 max-h-96 overflow-auto flex flex-col z-50 top-18`} >
                            <p className='text-center opacity-50 '>Try Searching for people, list or keyword</p>
                        </div>
                    }
                </div> */}
            </div>
            <div className={styles.navdiv2}>
                {
                    Navarray?.map((data, index) => {
                        return (
                            <NavLink key={index} to={data.path} className={``}>
                                {({ isActive }) =>
                                    <p className={`font-bold ${isActive ? "opacity-100" : "opacity-60"} h-[50px] flex justify-center items-center p-6 hover:bg-[var(--HOVER-BG)]  ${isActive && " border-b-3 border-b-blue-700"}  `} >{data.title}</p>
                                }
                            </NavLink >
                        )
                    })
                }
            </div>
            <div className={styles.navdiv3}>
                {
                    User_Array?.map((data, index) => (

                        <div key={index} className={styles.user_icon} onClick={(e) => handleClick(e, index, data.title)}>
                            <img
                                src={data.icon}
                                alt={data.title}
                                style={{ height: 24, width: 24 }}
                            />
                        </div>

                    ))
                }

            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {
                    InfoArray?.map((data, index) => {
                        return (
                            <Box sx={{ p: 1, width: 250, }} key={index} >
                                <div className='w-full flex' >
                                    <div className='w-[95%] rounded-l flex gap-2.5 pl-5 items-center cursor-pointer hover:bg-[#F0F2F5] h-12' style={{ paddingLeft: "10px" }} onClick={() => HandleInfoArray(data.title)} >
                                        <div className=' rounded-3xl flex justify-center  w-8 h-8 items-center' style={{ backgroundColor: "#E2E5E9" }} >
                                            <div className='opacity-90'>{data.icon}</div>
                                        </div>
                                        <div className='text-xs font-medium '>{data.title}</div>
                                    </div>
                                </div>
                            </Box>
                        )
                    })
                }
            </Popover>
            <div className={styles.homeOption}>
                {
                    HomeOptionArray?.map((data, index) => {
                        return (
                            <div className={styles.iconBox} key={index} onClick={() => navigate(data?.path)} >
                                <img src={data?.title == "My Account" ? (user?.profile_image || DemoUser) : data?.img}
                                    alt='homeOptionIcon'
                                    className={` rounded-full size-8 hover:bg-[var(--HOVER-BG)]`}
                                />

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Navbar