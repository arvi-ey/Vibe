import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ReactionBox({ openModal, setOpenModal, type, userArray }) {

    const handleClose = () => setOpenModal(false);

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '& .MuiBackdrop-root': {
                        backdropFilter: 'blur(1px)',
                        backgroundColor: '#00000080'
                    },
                    outline: 'none'
                }}
            >
                <div className="w-[500px] h-100 max-w-[90vw] max-h-[90vh] 
                flex flex-col items-center absolute top-[55%] left-[50%] sm:left-[45%] md:left-[55%] lg:left-[45%] xl:left-[40%] transform -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-lg shadow-xl outline-none overflow-hidden gap-2" style={{ padding: "20px" }}>
                    <div className='w-[100%] h-10 flex items-center border-b-1 justify-between border-[#11111135]'>
                        {
                            type == 'reaction' ?
                                <p className='font-semibold opacity-70' >Reactions</p>
                                :
                                <p className='font-semibold opacity-70' >Comments</p>
                        }
                        <span
                            className='h-8 w-8  rounded-3xl bg-[#E2E5E9] flex justify-center items-center cursor-pointer hover:bg-[#d4d6d6]'
                            onClick={() => {
                                setOpenModal(!openModal)
                            }}

                        >
                            <CloseIcon fontSize='small' />
                        </span>

                    </div>
                    <div className='w-[100%] flex flex-col gap-3'>
                        {
                            userArray?.map((data, index) => {
                                return (
                                    <div className='w-[100%] flex gap-4' key={data?.user_id}>
                                        <div className='flex justify-center items-center relative'>
                                            <img src={data?.profile_image} alt="user-image" className='h-10 w-10 rounded-full cursor-pointer' />
                                            <FavoriteIcon className='absolute -bottom-1 -right-1' style={{ color: "red" }} fontSize='small' />
                                        </div>
                                        <div>
                                            <p className='font-bold text-black opacity-90 cursor-pointer'>{data?.first_name} {data?.last_name}</p>
                                            <p className='text-xs text-black opacity-70'>{data?.time}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>




                </div>
            </Modal>
        </div>
    );
}
