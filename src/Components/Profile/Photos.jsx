import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePhotoBox from './ProfilePhotoBox'
import { useOutletContext } from 'react-router'
import Lottie from 'lottie-react';
import EmptyPhotos from "../../assets/Animation/EmptyPhotos.json"

const Photos = () => {
    const { profileposts } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.user)
    const { profileInfo } = useSelector(state => state.profile)


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">

            {
                profileposts?.length == 0 &&
                <div className='w-screen flex' >
                    <Lottie
                        animationData={EmptyPhotos}
                        loop
                        autoplay
                        style={{ width: '250px', height: '250px' }}
                    />
                    {user?.uid == profileInfo?.uid ?
                        <p className='font-bold opacity-70 text-lg'>{`Your photos section is empty`}</p>
                        :
                        <p className='font-bold opacity-70 text-lg'>{`${profileInfo?.first_name} ${profileInfo?.last_name}'s photos section is empty`}</p>
                    }
                </div>

            }

            {
                profileposts?.map((data, index) => {
                    return (
                        <ProfilePhotoBox
                            data={data}
                            keyValue={data.postid}
                        />
                    )
                })
            }

        </div>
    )
}

export default Photos