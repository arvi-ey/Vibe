import React, { useEffect, useRef, useState } from 'react'
import StoryBox from './StoryBox';
import styles from "./story.module.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CreateStory from './CreateStory';
import { useSelector } from 'react-redux';
import useStory from '../../../Hooks/useStory';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const Story = () => {
    const { user } = useSelector(state => state.user)
    const boxref = useRef(null)
    const { homeStories, UserStories } = useSelector(state => state.story)
    const { GetHomeStories, storyloading, Userstoryloading, FetchUserStories } = useStory()

    const [hideLeft, setHideLeft] = useState(true)
    const [hideRight, setHideRight] = useState(false)



    useEffect(() => {
        if (user) {
            FetchUserStories({ uid: user?.uid })
            GetHomeStories({ uid: user?.uid })
        }
    }, [user])



    const ScrollLeft = () => {
        const width = boxref.current.clientWidth
        boxref.current.scrollLeft = boxref.current.scrollLeft - width
    }

    const ScrollRight = () => {
        const width = boxref.current.clientWidth
        boxref.current.scrollLeft = boxref.current.scrollLeft + width

    }
    const ScrollToNext = () => {
        const { scrollWidth, scrollLeft, ScrollRight, clientWidth } = boxref.current
        if (scrollLeft == 0) {
            setHideLeft(true)
        }
        else {
            setHideLeft(false)
        }
        if (scrollLeft + clientWidth + 1 >= scrollWidth) {
            setHideRight(true)
        }
        else {
            setHideRight(false)
        }

    }



    useEffect(() => {
        if (homeStories && homeStories.length > 0) {

            boxref.current.addEventListener("scroll", ScrollToNext)
        }
        return () => {
            document.removeEventListener("scroll", ScrollToNext);
        };
    }, [homeStories])


    if (storyloading || Userstoryloading) {
        return (
            <div className={styles.storyContainer} ref={boxref} >
                <CreateStory />
                {
                    Array.from({ length: 4 })?.map((data, index) => {
                        return (
                            <div className={styles.storyBoxContainer} key={index}>
                                <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />
                            </div>

                        )
                    })
                }
            </div>
        )
    }


    return (
        <div style={{ position: "relative", width: "90vmin", backgroundColor: "transparent" }}>
            <div className={`${hideLeft ? styles.LeftScrollIconHide : styles.LeftScrollIcon}`} onClick={ScrollLeft}>
                <KeyboardArrowLeftIcon sx={{ backgroundColor: 'transparent' }} />
            </div>


            <div className={styles.storyContainer} ref={boxref} >
                <CreateStory />
                {UserStories?.length > 0 &&
                    <StoryBox
                        data={UserStories[0]}
                    />
                }
                {
                    homeStories?.map((data, index) => {
                        return (
                            <StoryBox
                                data={data}
                            />
                        )
                    })
                }
                {
                    (homeStories?.length == 0 && UserStories?.length == 0) &&
                    <h1 className={`text-sm sm:text-lg font-bold opacity-70`} > No stories yet..</h1>
                }
            </div>
            <div className={`${(hideRight || homeStories?.length < 4) ? styles.RightScrollIconHide : styles.RightScrollIcon}`} onClick={ScrollRight}>
                <KeyboardArrowRightIcon sx={{ backgroundColor: 'transparent' }} />
            </div>

        </div>
    )
}

export default Story