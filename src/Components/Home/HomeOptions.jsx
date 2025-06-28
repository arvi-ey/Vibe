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

const HomeOptions = () => {


    const HomeOptionArray = [
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
                        <div className={styles.iconBox} key={index}>
                            <div >
                                <img src={data?.img}
                                    alt='homeOptionIcon'
                                    className={styles.iconImage}
                                />
                            </div>
                            <div className={styles.titleText} >
                                {data?.title}

                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default HomeOptions