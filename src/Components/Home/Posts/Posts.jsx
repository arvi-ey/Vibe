import React from 'react'
import PostBox from './PostBox';
import styles from "./post.module.css"

const Posts = () => {
    const demoPosts = [
        {
            user_name: "Arjun Mehta",
            user_posted: "https://images.unsplash.com/photo-1751217052634-cd51e3519355?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            profile_photo: "https://randomuser.me/api/portraits/men/32.jpg",
            time: "2m ago",
            caption: "Exploring the wilderness. 🌲"
        },
        {
            user_name: "Riya Sharma",
            user_posted: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            profile_photo: "https://randomuser.me/api/portraits/women/21.jpg",
            time: "15m ago",
            caption: "Wander often, wonder always."
        },
        {
            user_name: "Kabir Anand",
            user_posted: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
            profile_photo: "https://randomuser.me/api/portraits/men/41.jpg",
            time: "1h ago",
            caption: "Top of the world moment."
        },
        {
            user_name: "Anaya Singh",
            user_posted: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            profile_photo: "https://randomuser.me/api/portraits/women/36.jpg",
            time: "2h ago",
            caption: "Caffeine + book = heaven ☕"
        },
        {
            user_name: "Yash Patel",
            user_posted: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
            profile_photo: "https://randomuser.me/api/portraits/men/56.jpg",
            time: "5h ago",
            caption: "City lights, quiet nights."
        },
        {
            user_name: "Meera Nair",
            user_posted: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            profile_photo: "https://randomuser.me/api/portraits/women/19.jpg",
            time: "7h ago",
            caption: "Sunsets and silhouettes 🌇"
        },
        {
            user_name: "Raghav Malhotra",
            user_posted: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
            profile_photo: "https://randomuser.me/api/portraits/men/44.jpg",
            time: "10h ago",
            caption: "Coding fuels my soul."
        },
        {
            user_name: "Ayesha Khan",
            user_posted: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            profile_photo: "https://randomuser.me/api/portraits/women/45.jpg",
            time: "13h ago",
            caption: "Finished another classic. 📖"
        },
        {
            user_name: "Nikhil Joshi",
            user_posted: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
            profile_photo: "https://randomuser.me/api/portraits/men/23.jpg",
            time: "16h ago",
            caption: "No excuses. Just results."
        },
        {
            user_name: "Sanya Arora",
            user_posted: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            profile_photo: "https://randomuser.me/api/portraits/women/29.jpg",
            time: "1d ago",
            caption: "Vitamin Sea 🌊"
        },
        {
            user_name: "Dev Sharma",
            user_posted: "https://images.unsplash.com/photo-1516478177764-9fe5bd7f8a84",
            profile_photo: "https://randomuser.me/api/portraits/men/37.jpg",
            time: "2d ago",
            caption: "Ride fast, live young 🏍️"
        },
        {
            user_name: "Tara Kapoor",
            user_posted: "https://images.unsplash.com/photo-1519741491040-9470f11d8d5e",
            profile_photo: "https://randomuser.me/api/portraits/women/10.jpg",
            time: "3d ago",
            caption: "Chasing trends ✨"
        },
        {
            user_name: "Aryan Verma",
            user_posted: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
            profile_photo: "https://randomuser.me/api/portraits/men/18.jpg",
            time: "4d ago",
            caption: "Food is the ingredient that binds us together."
        },
        {
            user_name: "Simran Jain",
            user_posted: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
            profile_photo: "https://randomuser.me/api/portraits/women/14.jpg",
            time: "5d ago",
            caption: "Painting is my therapy 🎨"
        },
        {
            user_name: "Rahul Desai",
            user_posted: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
            profile_photo: "https://randomuser.me/api/portraits/men/5.jpg",
            time: "6d ago",
            caption: "Into the wild 🌲"
        },
        {
            user_name: "Nisha Bhatt",
            user_posted: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
            profile_photo: "https://randomuser.me/api/portraits/women/4.jpg",
            time: "1w ago",
            caption: "Meet my new furball 🐶"
        },
        {
            user_name: "Karan Sethi",
            user_posted: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
            profile_photo: "https://randomuser.me/api/portraits/men/1.jpg",
            time: "2w ago",
            caption: "Looking at stars makes problems feel small 🌌"
        },
        {
            user_name: "Ishita Bose",
            user_posted: "https://images.unsplash.com/photo-1488371934083-edb7857977df",
            profile_photo: "https://randomuser.me/api/portraits/women/53.jpg",
            time: "2w ago",
            caption: "Happiness is real only when shared ❤️"
        },
        {
            user_name: "Veer Saxena",
            user_posted: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
            profile_photo: "https://randomuser.me/api/portraits/men/60.jpg",
            time: "3w ago",
            caption: "Drive your passion. 🏎️"
        },
        {
            user_name: "Pooja Reddy",
            user_posted: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
            profile_photo: "https://randomuser.me/api/portraits/women/61.jpg",
            time: "1mo ago",
            caption: "Music is the strongest form of magic 🎶"
        },
        {
            user_name: "Ritik Sharma",
            user_posted: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            profile_photo: "https://randomuser.me/api/portraits/men/15.jpg",
            time: "1mo ago",
            caption: "My desk setup 💻"
        },
        {
            user_name: "Shruti Yadav",
            user_posted: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            profile_photo: "https://randomuser.me/api/portraits/women/30.jpg",
            time: "2mo ago",
            caption: "Click. Capture. Cherish 📷"
        }
    ];



    return (
        <div className={styles.postContainer} >
            {
                demoPosts?.map((data, index) => {
                    return (
                        <PostBox
                            data={data}
                            key={index}

                        />
                    )
                })

            }
        </div>
    )
}

export default Posts