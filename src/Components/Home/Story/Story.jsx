import React, { useEffect, useRef, useState } from 'react'
import StoryBox from './StoryBox';
import styles from "./story.module.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CreateStory from './CreateStory';
const Story = () => {


    const boxref = useRef(null)

    const [hideLeft, setHideLeft] = useState(true)
    const [hideRight, setHideRight] = useState(false)

    const posts = [
        {
            id: 1,
            name: "Sophia Miller",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "2h ago"
        },
        {
            id: 2,
            name: "Emma Johnson",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "5h ago"
        },
        {
            id: 3,
            name: "Olivia Brown",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "10h ago"
        },
        {
            id: 4,
            name: "Ava Davis",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "1d ago"
        },
        {
            id: 5,
            name: "Isabella Wilson",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "3d ago"
        },
        {
            id: 6,
            name: "Mia Anderson",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "5d ago"
        },
        {
            id: 7,
            name: "Charlotte Martinez",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "1w ago"
        },
        {
            id: 8,
            name: "Amelia Garcia",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "2w ago"
        },
        {
            id: 9,
            name: "Harper Thompson",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "3w ago"
        },
        {
            id: 10,
            name: "Evelyn White",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "1mo ago"
        },
        {
            id: 11,
            name: "Abigail Lewis",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "2mo ago"
        },
        {
            id: 12,
            name: "Ella Hall",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "Yesterday"
        },
        {
            id: 13,
            name: "Scarlett Allen",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "Today"
        },
        {
            id: 14,
            name: "Grace Young",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "5min ago"
        },
        {
            id: 15,
            name: "Chloe Hernandez",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "30min ago"
        },
        {
            id: 16,
            name: "Luna King",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "45min ago"
        },
        {
            id: 17,
            name: "Victoria Scott",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "6h ago"
        },
        {
            id: 18,
            name: "Aria Lopez",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "9h ago"
        },
        {
            id: 19,
            name: "Lily Adams",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "3d ago"
        },
        {
            id: 20,
            name: "Zoey Baker",
            image: "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=",
            profileImage: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg",
            timing: "4h ago"
        }
    ];



    const ScrollLeft = () => {
        const width = boxref.current.clientWidth
        // console.log(boxref.current.scrollLeft)
        boxref.current.scrollLeft = boxref.current.scrollLeft - width
    }

    const ScrollRight = () => {
        const width = boxref.current.clientWidth
        boxref.current.scrollLeft = boxref.current.scrollLeft + width

    }
    const ScrollToNext = () => {
        const { scrollWidth, scrollLeft, clientWidth } = boxref.current
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
        if (posts && posts.length > 0) {

            boxref.current.addEventListener("scroll", ScrollToNext)
        }
        return () => {
            document.removeEventListener("scroll", ScrollToNext);
        };
    }, [posts])

    return (
        <div style={{ position: "relative", width: "90vmin", backgroundColor: "transparent" }}>
            <div className={`${hideLeft ? styles.LeftScrollIconHide : styles.LeftScrollIcon}`} onClick={ScrollLeft}>
                <KeyboardArrowLeftIcon sx={{ backgroundColor: 'transparent' }} />
            </div>


            <div className={styles.storyContainer} ref={boxref} >
                <CreateStory />
                {
                    posts?.map((data, index) => {
                        return (
                            <StoryBox
                                // keyID={index}
                                data={data}
                            />
                        )
                    })
                }
            </div>
            <div className={`${hideRight ? styles.RightScrollIconHide : styles.RightScrollIcon}`} onClick={ScrollRight}>
                <KeyboardArrowRightIcon sx={{ backgroundColor: 'transparent' }} />
            </div>
        </div>
    )
}

export default Story