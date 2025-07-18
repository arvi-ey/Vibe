import React, { useEffect, useState } from 'react'
import Boy from "../../assets/boy.png"
import styles from "./profile.module.css"
import emotion from "../../assets/emotion.png"
import Live from "../../assets/Live.svg"
import postPhoto from "../../assets/postPhoto.svg"
import { useSelector } from 'react-redux'
import DemoUser from "../../assets/demo-user.png"
import CreatePost from '../CreatePost/Createpost'
import Alert from '../../Common/Alert'


const CreateProfilePost = ({ userId }) => {
    const [openPostModal, setOpenPostModal] = useState(false)
    const { user } = useSelector(state => state.user)
    const [clickedicon, setClickedIcon] = useState(null)
    const [uploadpost, setUploadpost] = useState(false)

    const HomePostArray = [
        {
            title: "Live Video",
            photo: Live
        },
        {
            title: "Photo/Video",
            photo: postPhoto
        },
        {
            title: "Feeling/Activity",
            photo: emotion
        },

    ]
    const HandleOpenPostModal = (clickedobj) => {
        if (clickedobj.title) setClickedIcon(clickedobj.title)
        else setClickedIcon(null)
        setOpenPostModal(true)
    }

    useEffect(() => {
        if (uploadpost) setTimeout(() => { setUploadpost(false) }, 2000)
    }, [uploadpost])

    return (
        <div className={` w-[100%]  flex flex-col h-[120px] rounded-[20px] gap-3 justify-center shadow-md `} style={{ paddingLeft: "15px", paddingRight: "15px" }}>
            <div className='flex items-center gap-3'>
                <div className='cursor-pointer rounded-2xl size-10' >
                    <img src={user?.profile_image || DemoUser} alt='Homeuser' className='size-10 rounded-full' />
                </div>
                <div className={`text-sm bg-[#edeff0] hover:bg-[#dad9d9] h-[40px] w-[80%] flex items-center rounded-2xl opacity-70 cursor-pointer font-semibold  `} style={{ paddingLeft: "20px" }} onClick={HandleOpenPostModal} >
                    What's on your mind, {user?.first_name} ?
                </div>
            </div>
            <div className={`flex justify-around border-t-1 border-[#e5e3e3] `} style={{ marginTop: "10px" }}>

                {
                    HomePostArray?.map((data, index) => {
                        return (
                            <div className={`flex flex-row justify-center items-center cursor-pointer gap-2 rounded-lg  hover:bg-[#edeff0] ${data?.title !== "Photo/Video" ? styles.postIconBox : ""} `} key={index} style={{ padding: "7px", marginTop: "10px" }}
                                onClick={() => HandleOpenPostModal(data)}
                            >
                                <img src={data?.photo} alt='PostIcon' className={`size-5 ${styles.profile_post_icon}`} />

                                <p className='text-xs sm:text-sm font-semibold opacity-70'>
                                    {data?.title}
                                </p>
                            </div>

                        )
                    })
                }
            </div>
            {
                openPostModal &&
                <CreatePost
                    openModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                    setUploadpost={setUploadpost}
                    clickedicon={clickedicon}
                    postType="Feed"
                />
            }
            <Alert
                message="Post was uploaded successfully."
                open={uploadpost}
            />
        </div >
    )
}

export default CreateProfilePost