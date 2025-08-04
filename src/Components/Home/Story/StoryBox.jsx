import React from 'react'
import styles from "./story.module.css"
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector } from 'react-redux';

const StoryBox = ({ data }) => {
    const { user } = useSelector(state => state.user)
    const [open, setOpen] = useState(false);
    const [nextImage, setnextImage] = useState(0)



    const StoryModal = () => {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
                xs: '90vw', // phones
                sm: '80vw', // tablets
                md: '50vw', // small laptops
                lg: '40vw', //desktops
                xl: '40vw'  // extra large devices
            },
            height: 600,
            bgcolor: '#000000',
            boxShadow: 24,
            borderRadius: 2,
            overflow: "hidden"
        };

        const handleClose = () => {
            setOpen(false);
            setnextImage(0)
        }

        const OnImageChange = (direction) => {
            if (data?.stories.length > 0) {
                if (direction == "Next") setnextImage(nextImage + 1)
                else setnextImage(nextImage - 1)
            }
        }
        return (
            <div className='size-90'>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{}}
                >
                    <Box sx={style}>
                        <div className=' h-[100%] flex items-center justify-around relative bg-black' >
                            <div className='flex h-auto absolute  items-center top-2 left-2 w-[100%] gap-5 '>
                                <img src={data?.profile_image} alt='UploaderProfileimage' className='size-10 rounded-full' />
                                <div className='text-amber-50 font-bold' >{`${data?.first_name} ${data?.last_name}`}</div>
                            </div>
                            <span className='absolute right-2 top-2 h-7 w-7 rounded-3xl bg-[#E2E5E9] flex justify-center items-center cursor-pointer hover:bg-[#d4d6d6]' onClick={handleClose}>
                                <CloseIcon fontSize='small' />
                            </span>
                            <div className='w-[8%] h-[100%] flex justify-center items-center'>
                                <div className={`${(data?.stories.length > 0 && nextImage > 0) ? styles.StoryLeftScrollIcon : styles.LeftScrollIconHide}`} onClick={() => OnImageChange("Previous")} >
                                    <KeyboardArrowLeftIcon sx={{ backgroundColor: 'transparent', fontSize: 'large' }} />
                                </div>
                            </div>
                            <img src={data?.stories[nextImage].image} alt="Storyimage" className='h-[100%] w-[70%] rounded-xl  object-cover' />
                            <div className='w-[8%] h-[100%] flex justify-center items-center'>
                                <div className={`${(data?.stories.length > 0 && nextImage < data?.stories.length - 1) ? styles.StoryRightScrollIcon : styles.RightScrollIconHide}`} onClick={() => OnImageChange("Next")} >
                                    <KeyboardArrowRightIcon sx={{ backgroundColor: 'transparent', fontSize: 'large' }} />
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        )
    }

    return (
        <>
            <div className={styles.storyBoxContainer} key={data?.storyid}
                onClick={() => setOpen(true)}
            >
                <img src={data?.stories[data?.stories.length - 1].image} alt="Storyimage" className={styles.userStory} />
                <img src={data?.profile_image} alt='UploaderProfileimage' className={styles.UploaderProfileimage} />
                {
                    user?.uid == data?.uid ?
                        <div className={styles.UserName} >Your Story</div>
                        :
                        <div className={styles.UserName} >{`${data?.first_name} ${data?.last_name}`}</div>
                }
            </div>
            {
                open &&
                <StoryModal />
            }
        </>
    )
}

export default StoryBox
