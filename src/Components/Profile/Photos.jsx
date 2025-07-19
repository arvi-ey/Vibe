import React from 'react'
import { useSelector } from 'react-redux'
import ProfilePhotoBox from './ProfilePhotoBox'

const Photos = () => {
    const { profileposts } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.user)

    console.log(profileposts)

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
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