import React from 'react'
import styles from "./home.module.css"
import Groups from "../../assets/Groups.png"
import marketplace from "../../assets/marketplace.png"
import reels from "../../assets/reels.png"
import Saved from "../../assets/Saved.png"
import memories from "../../assets/memories.png"
import following from "../../assets/following.png"
import games from "../../assets/games.png"
import event from "../../assets/event.png"
import Birthday from "../../assets/Birthday.png"
import Boy from "../../assets/boy.png"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import DemoUser from "../../assets/demo-user.png"

const HomeOptions = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)

    const HomeOptionArray = [
        {
            title: "My Account",
            path: `/profile/${user?.uid}`

        },
        {
            title: "Friends",
            img: following,
            path: '/friends'

        },
        {
            title: "Memories",
            img: memories

        },
        {
            title: "Saved",
            img: Saved

        },
        {
            title: "Groups",
            img: Groups

        },
        {
            title: "Reels",
            img: reels

        },
        {
            title: "Market Place",
            img: marketplace

        },
        {
            title: "Games",
            img: games

        },
        {
            title: "Event",
            img: event

        },
        {
            title: "Birthday",
            img: Birthday

        },
    ]

    return (

        <div className={styles.homeOptionContainer}>
            {
                HomeOptionArray?.map((data, index) => {
                    return (
                        <div className={styles.iconBox} key={index} onClick={() => navigate(data?.path)} >
                            <div >
                                <img src={data?.title == "My Account" ? (user?.profile_image || DemoUser) : data?.img}
                                    alt='homeOptionIcon'
                                    className={` rounded-full ${styles.iconImage}`}
                                />
                            </div>
                            <div className={`${data?.title == "My Account" ? "font-bold" : "font-semibold"} ${styles.titleText}`} >
                                {data?.title == "My Account" ? `${user?.first_name} ${user?.last_name}` : data?.title}

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default HomeOptions