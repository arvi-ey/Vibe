import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import Upload_Image from "../../assets/Upload_image.png"
import Button from "../../Common/Button"

export default function CreatePost({ openModal, setOpenPostModal }) {
    const handleClose = () => setOpenPostModal(false);
    const { user } = useSelector(state => state.user)

    console.log(user)


    return (
        <div>
            <Modal
                keepMounted
                open={openModal}
                onClose={handleClose}
                sx={{
                    '& .MuiBackdrop-root': {
                        backdropFilter: 'blur(1px)',
                        backgroundColor: '#00000080'
                    },
                    outline: 'none'
                }}
            >
                <div
                    className="w-[90vw] sm:w-[80vw] md:w-[500px] lg:w-[550px] xl:w-[600px] max-w-[95%] h-[300px]
                 sm:h-[300px] md:h-[300px] lg:h-[350px] xl:h-[400px] flex flex-col 
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-lg shadow-xl outline-none overflow-hidden gap-2">
                    <div className='flex h-10 w-ful justify-center items-center relative border-b-1 border-[#eae6e6]' >
                        <p className='font-bold opacity-80' >Create post</p>
                        <span className='absolute right-2 h-7 w-7 rounded-3xl bg-[#E2E5E9] flex justify-center items-center cursor-pointer hover:bg-[#d4d6d6]' onClick={handleClose}>
                            <CloseIcon fontSize='small' />
                        </span>
                    </div>
                    <div className='w-full flex items-center gap-2' style={{ paddingLeft: "10px" }} >
                        <img src={user?.profile_image} alt="UserAccount" className='h-8 w-8 rounded-full' />
                        <p className='font-bold text-xs opacity-70 ' >{`${user?.first_name} ${user?.last_name}`}</p>
                    </div>
                    <div className='w-full h-[50%]flex' style={{ paddingLeft: "10px", marginTop: "5px" }} >
                        <textarea
                            placeholder={`What's on your mind, ${user?.first_name}?`}
                            className="w-full px-4 pb-2 text-base placeholder:text-gray-500 placeholder:text-lg placeholder:font-medium resize-none outline-none 
                           min-h-[80px] max-h-[150px] overflow-y-auto"
                            rows={10}
                        />
                    </div>
                    <div className='h-20 w-full flex justify-center items-center ' >
                        <div className='w-[90%] h-full flex-col flex justify-center items-center cursor-pointer hover:bg-[#f7fbff] rounded-xl border-2 border-dashed border-[#e4f1fe]'>
                            <img src={Upload_Image} alt='upload_image' className='h-8 w-8 opacity-35' />
                            <p className='font-bold text-sm text-gray-500' > Browse image, or <span className='text-[var(--PRIMARY-COLOR)]' >browse</span> </p>
                            <p className='font-medium text-[0.6rem] text-gray-500' > Supports: JPG ,JPEG20000,PNG</p>
                        </div>
                    </div>
                    <div className='h-10 w-full flex justify-center items-center'>
                        <Button
                            ButtonStyle={`w-[90%] bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] rounded-md`}
                            Text='Post'
                            TextStyle={`text-[var(--BACKGROUND-COLOR)] font-bold text-sm`}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
