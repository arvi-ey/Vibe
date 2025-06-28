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
const Navbar = () => {


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


    return (
        <div className={styles.Layout_container}>
            <div className={styles.navdiv1}>
                <img src={Logo} alt='Logo' className={styles.Logo_Image} />
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

                        <div key={index} className={styles.user_icon}>
                            <img
                                src={data.icon}
                                alt={data.title}
                                style={{ height: 24, width: 24 }}
                            />
                        </div>

                    ))
                }

            </div>
        </div>
    )
}

export default Navbar