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
import { useDispatch } from 'react-redux';
import { AddUserID } from '../../Redux/Slices/authSlicer';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { UserSignOut } = useSignOut()
    const navigate = useNavigate()


    const Navarray = [
        {
            title: "Home",
            icon: <HomeRoundedIcon />,
            path: "/"
        },
        {
            title: "Marketplace",
            icon: <StorefrontRoundedIcon />,
            path: "/marketplace"
        },
        {
            title: "Groups",
            icon: <GroupsRoundedIcon />,
            path: "/groups"
        },
        {
            title: "Gaming",
            icon: <SportsEsportsIcon />,
            path: "/gaming"
        }
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
                dispatch(AddUserID(null))
                navigate("/signin")
            }
        }
    }


    return (
        <div className={styles.Layout_container}>
            <div className={styles.navdiv1}>
                <img src={Logo} alt='Logo' className={`cursor-pointer ${styles.Logo_Image}`} />
                <input
                    type='text'
                    placeholder='Search Vibe ...'
                    className={styles.Search_bar}

                />

            </div>
            <div className={styles.navdiv2}>
                {
                    Navarray?.map((data, index) => {
                        return (
                            <NavLink key={index} to={data.path}>
                                {({ isActive }) =>
                                    React.cloneElement(data.icon, {
                                        sx: {
                                            color: isActive ? 'var(--PRIMARY-COLOR)' : '#575F6D',
                                            fontSize: 26
                                        }
                                    })
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
        </div >
    )
}

export default Navbar