import React from 'react'

const ProfilePhotoBox = ({ data, keyValue }) => {

    if (!data?.image || !data?.image_public_id) return
    return (
        <div className="w-full aspect-square overflow-hidden rounded-2xl cursor-pointer" key={keyValue}>
            <img src={data?.image} className="w-full h-full object-cover" />

        </div>
    )
}

export default ProfilePhotoBox