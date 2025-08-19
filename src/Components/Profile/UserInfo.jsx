import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Graduation from "../../assets/graduation.png"
import Heart from "../../assets/heart.png"
import City from "../../assets/city.png"
import Job from "../../assets/job.png"
import Marker from "../../assets/marker.png"
import styles from "./profile.module.css"
import useUser from '../../Hooks/useUser'
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';


const UserInfo = ({ userinfo }) => {
    const { user } = useSelector(state => state.user)
    const [userBio, setuserBio] = useState("")
    const [click, setClick] = useState(false)
    const [initialbio, setInitialbio] = useState()
    const maxLength = 50;
    const { UpdateUser, loading, error } = useUser()

    useEffect(() => {
        setuserBio(user?.bio || "")
        setInitialbio(user?.bio || "")
    }, [user])

    const UpdateBio = async () => {
        if (initialbio == userBio) {
            setClick(false)
            return
        }
        try {
            const result = await UpdateUser(userinfo.uid, { bio: userBio })
            if (result.uid) {
                setuserBio(result.bio)
                toast.success(`Bio updated `)
                setClick(false)
            }

        }
        catch (error) {
            toast(`${error.message}`)
        }
    }




    return (
        <div className='lg:w-[36%] lg:sticky lg:top-20 w-[90%] shadow:lg flex flex-col gap-2' style={{ paddingBottom: "20px" }} >
            <h1 className='font-bold text-xl'>Intro</h1>
            {click ?
                <textarea
                    className={`w-full px-4 py-2 border-1 outline-none  rounded-lg transition-all duration-200`}
                    rows={2}
                    maxLength={maxLength}
                    value={userBio}
                    onChange={(e) => setuserBio(e.target.value)}
                />
                :
                <div className='w-full flex justify-center items-center'>
                    <p className='font-semibold text-black opacity-70'>
                        {user.uid == userinfo.uid ? user.bio : userinfo?.bio}
                    </p>
                </div>

            }
            {
                click ?
                    <div className={`w-[100%] h-10 ${!loading && "bg-[var(--PRIMARY-COLOR)] cursor-pointer hover:bg-blue-700 "} flex justify-center items-center rounded-lg`}
                        onClick={UpdateBio}
                    >
                        {
                            loading ?
                                <CircularProgress /> :

                                <p className='font-semibold text-white'>Save</p>
                        }
                    </div> :
                    user.uid == userinfo.uid ?

                        <div className='w-[100%] h-10 bg-[#E6E8EA] cursor-pointer hover:bg-[#dfe1e3] flex justify-center items-center rounded-lg'
                            onClick={() => setClick(true)}
                        >
                            <p className='font-semibold'>Edit Bio</p>
                        </div> :
                        <div className='w-[100%] h-10  flex justify-center items-center rounded-lg'></div>
            }


            <div className={`w-full flex flex-col gap-6 ${styles.info_box} `} >
                {
                    userinfo?.profession &&
                    <div className='w-[100%] flex gap-3 items-center'>
                        <img src={Job} alt='job-image' className={`size-5 ${styles.info_image_user} `} />
                        <div className='flex gap-2'>
                            <p className={styles.infoTitle}>{userinfo?.profession}</p>
                            <p className={`font-bold cursor-pointer ${styles.infoTitle}`}>{userinfo?.company_name}</p>
                        </div>
                    </div>
                }
                {
                    userinfo?.school &&
                    <div className='w-[100%]  flex gap-3 items-start '>
                        <img src={Graduation} alt='job-image' className={`size-5 mt-3 ${styles.info_image_user}`} style={{ marginTop: "5px" }} />
                        <p className={`font-bold cursor-pointer ${styles.infoTitle}`}>Studied at {userinfo?.school}</p>
                    </div>
                }
                {
                    userinfo?.relationship_status &&
                    <div className='w-[100%] flex gap-3 items-center'>
                        <img src={Heart} alt='job-image' className={`size-5 ${styles.info_image_user} `} />
                        <div className='flex gap-2'>
                            <p className={styles.infoTitle}>Relationship</p>
                            <p className={`font-bold cursor-pointer ${styles.infoTitle}`}>{userinfo?.relationship_status}</p>
                        </div>
                    </div>
                }
                {
                    userinfo?.City &&
                    <div className='w-[100%] flex gap-3 items-center'>
                        <img src={City} alt='job-image' className={`size-5 ${styles.info_image_user} `} />
                        <div className='flex gap-2'>
                            <p className={styles.infoTitle}>Lives in</p>
                            <p className={`font-bold cursor-pointer ${styles.infoTitle}`}>{userinfo?.city}</p>
                        </div>
                    </div>
                }
                <div className='w-[100%] flex gap-3 items-center'>
                    <img src={Marker} alt='job-image' className={`size-5 ${styles.info_image_user} `} />
                    <div className='flex gap-2'>
                        <p className={styles.infoTitle}>From</p>
                        <p className={`font-bold cursor-pointer ${styles.infoTitle}`}>{`${userinfo?.state || ""} ${userinfo?.state ? "," : " "}  ${userinfo?.country}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo