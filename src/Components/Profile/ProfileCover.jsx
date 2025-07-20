import React, { useEffect } from 'react';
import Cover from "../../assets/cover.jpg";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DemoUser from "../../assets/demo-user.png";
import styles from "./profile.module.css";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CreatePost from '../CreatePost/Createpost';
import { useState } from 'react';
import Alert from '../../Common/Alert';
import { useSelector } from 'react-redux';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import useFriends from '../../Hooks/useFriend';
import CloseIcon from '@mui/icons-material/Close';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import ScreenLoading from "../../Common/ScreenLoading"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const ProfileCover = ({ profileInfo }) => {
    const [openPostModal, setOpenPostModal] = useState(false)
    const [uploadpost, setUploadpost] = useState(false)
    const [modalSource, setModalSource] = useState(null)
    const { user } = useSelector(state => state.user)
    const [friendStatus, setFriendSatus] = useState(null)
    const { HandleFriends, loading, CheckFriend } = useFriends()

    const HandleOpenPostModal = (source) => {
        setOpenPostModal(true)
        setModalSource(source)
    }

    useEffect(() => {
        const checkFriend = async () => {
            if (user?.uid && profileInfo?.uid && user?.uid != profileInfo?.uid) {
                const requestBody = {
                    sender: user?.uid,
                    receiver: profileInfo?.uid
                }
                const result = await CheckFriend(requestBody)
                if (result) setFriendSatus(result)
                else setFriendSatus({ status: 'not' })
            }
        }
        checkFriend()
    }, [user?.uid, profileInfo?.uid])


    useEffect(() => {
        if (uploadpost) setTimeout(() => { setUploadpost(false) }, 2000)
    }, [uploadpost])

    const handleFriendRequest = async (status) => {

        let payloadObj
        if (status == 'sent') {
            payloadObj = {
                sender: user?.uid,
                receiver: profileInfo?.uid,
                status: status,
                sent_time: Date.now()
            }
        }
        else {

            payloadObj = {
                id: friendStatus?.id,
                sender: friendStatus?.sender,
                receiver: friendStatus?.receiver,
                status: status,
                sent_time: Date.now()
            }
        }
        const result = await HandleFriends(payloadObj)
        if (result) setFriendSatus(result)
    }

    if (!friendStatus && profileInfo?.uid !== user?.uid) {
        return (
            <ScreenLoading />
        )
    }

    return (
        <>
            <div className='h-64 w-[90%] min-w-4xs max-w-5xl relative overflow-hidden mt-16 mx-auto rounded-xl' style={{ marginTop: "60px" }}>
                {
                    user?.cover_photo || profileInfo?.cover_photo ?
                        <img
                            src={profileInfo?.uid == user?.uid ? user?.cover_photo : profileInfo?.cover_photo || Cover}
                            alt='cover-photo'
                            className='w-full h-full object-cover rounded-xl'
                        /> :
                        <img
                            src={Cover}
                            alt='cover-photo'
                            className='w-full h-full object-cover rounded-xl'
                        />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
                {
                    profileInfo?.uid == user?.uid &&
                    <div className="cursor-pointer absolute bottom-2 right-2 rounded-md h-7 gap-2 bg-amber-50 hover:bg-[#E6E8EA] w-auto min-w-[2.5rem] sm:w-36 flex justify-center items-center px-2 sm:px-4"
                        onClick={() => HandleOpenPostModal("cover_photo")}
                    >
                        <CameraAltIcon fontSize="small" sx={{ opacity: "0.8" }} />
                        <p className="text-xs font-bold whitespace-nowrap hidden sm:block">
                            {profileInfo?.cover_photo ? "Edit cover photo" : "Add cover photo"}
                        </p>
                    </div>
                }
            </div>

            <div className={`w-[90%] max-w-5xl mx-auto flex ${styles.profile_image_box}`}>
                <div className={`w-40 ${styles.profilePic_box} `}>
                    <div className='absolute size-24 sm:size-32 flex justify-center items-center border-white border-[5px] rounded-full -top-20 sm:-top-20 left-3 sm:left-6 bg-white '>
                        {
                            user?.profile_image || profileInfo?.profile_image ?
                                <img
                                    src={profileInfo?.uid == user?.uid ? user?.profile_image : profileInfo?.profile_image || DemoUser}
                                    alt='profile-photo'
                                    className='h-full w-full object-cover rounded-full'
                                />
                                :
                                <img
                                    src={DemoUser}
                                    alt='profile-photo'
                                    className='h-full w-full object-cover rounded-full'
                                />

                        }
                        {
                            profileInfo?.uid == user?.uid &&
                            <div className="cursor-pointer absolute bottom-1 -right-1 rounded-full bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] h-7 w-7 flex justify-center items-center"
                                onClick={() => HandleOpenPostModal("profile_image")}
                            >
                                <CameraAltIcon fontSize="small" sx={{ opacity: "0.8" }} />
                            </div>
                        }
                    </div>
                </div>

                <div className={`w-full h-full lg:pb-20  ${styles.Profile_pic_content}`}>
                    <p className='font-bold text-3xl sm:text-3xl mt-6 sm:mt-10'>
                        {`${profileInfo?.first_name} ${profileInfo?.last_name}`}
                    </p>

                    {
                        profileInfo?.uid !== user?.uid ?
                            <div className={`gap-2 flex items-center ${styles.otherProfileInfo}`}>

                                {
                                    friendStatus?.status == 'sent' && friendStatus?.sender == user?.uid ?
                                        <div className="cursor-pointer rounded-md h-10 gap-2 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] w-[70%]  sm:h-9 sm:w-36 flex justify-center items-center px-2 sm:px-4"
                                            onClick={() => handleFriendRequest('not')}
                                        >
                                            <CloseIcon fontSize="small" sx={{ opacity: "0.8" }} />
                                            <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                                Cancel Request
                                            </p>
                                        </div>
                                        :
                                        friendStatus?.status == 'sent' && friendStatus?.receiver == user?.uid && friendStatus?.sender == profileInfo?.uid ?
                                            <div className="cursor-pointer rounded-md h-10 gap-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] w-[70%]  sm:h-9 sm:w-36 flex justify-center items-center px-2 sm:px-4"
                                                onClick={() => handleFriendRequest('received')}
                                            >
                                                <SwipeRightIcon fontSize="small" sx={{ color: "white" }} />
                                                <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                                    Confirm
                                                </p>
                                            </div>
                                            :
                                            friendStatus?.status == 'received' ?
                                                <div className="cursor-pointer rounded-md h-10 gap-2 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] w-[70%]  sm:h-9 sm:w-36 flex justify-center items-center px-2 sm:px-4"

                                                >
                                                    <VerifiedUserIcon fontSize="small" sx={{ opacity: "0.8" }} />
                                                    <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                                        Friends
                                                    </p>
                                                </div>
                                                :
                                                friendStatus?.status == 'not' ?
                                                    <div className="cursor-pointer rounded-md h-10 gap-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] w-[70%]  sm:h-9 sm:w-36 flex justify-center items-center px-2 sm:px-4"
                                                        onClick={() => handleFriendRequest('sent')}

                                                    >
                                                        <PersonAddIcon fontSize="small" sx={{ color: "white" }} />
                                                        <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                                            Add friend
                                                        </p>
                                                    </div>
                                                    : null
                                }
                                {
                                    friendStatus?.status == 'received' &&
                                    <div className="cursor-pointer rounded-md h-10 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] w-[70%]  sm:h-9 sm:w-30 flex justify-center items-center px-2 sm:px-4">
                                        <SendIcon fontSize="small" sx={{ color: "white", opacity: 0.8 }} />
                                        <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                            Message
                                        </p>
                                    </div>
                                }

                                <div className="cursor-pointer rounded-md h-10 gap-2 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] w-[70%] sm:h-9 sm:w-12 flex justify-center items-center px-2 sm:px-4">
                                    <KeyboardArrowDownIcon fontSize="small" sx={{ opacity: "0.8" }} />
                                </div>
                            </div> :
                            <div className={`gap-2 flex items-center ${styles.otherProfileInfo}`}>
                                <div className="cursor-pointer rounded-md h-10 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] w-[70%]  sm:h-9 sm:w-30 flex justify-center items-center px-2 sm:px-4">
                                    <AddIcon fontSize="small" sx={{ color: "white", opacity: 0.8 }} />
                                    <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                        Add to story
                                    </p>
                                </div>

                                <div className="cursor-pointer rounded-md h-10 gap-2 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] w-[70%]  sm:h-9 sm:w-36 flex justify-center items-center px-2 sm:px-4">
                                    <EditIcon fontSize="small" sx={{ opacity: "0.8" }} />
                                    <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                        Edit profile
                                    </p>
                                </div>

                                <div className="cursor-pointer rounded-md h-10 gap-2 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] w-[70%] sm:h-9 sm:w-12 flex justify-center items-center px-2 sm:px-4">
                                    <KeyboardArrowDownIcon fontSize="small" sx={{ opacity: "0.8" }} />
                                </div>
                            </div>
                    }
                </div>
            </div>
            {openPostModal &&
                <CreatePost
                    openModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                    setUploadpost={setUploadpost}
                    postType={modalSource}
                />
            }
            <Alert
                message="Post was uploaded successfully."
                open={uploadpost}
            />
        </>
    );
};

export default ProfileCover;
