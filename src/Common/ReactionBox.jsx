import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Lottie from 'lottie-react';
// import Empty_comment from "../../assets/Animation/empty_comment.json"
import Empty_comment from "../assets/Animation/empty_comment.json"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useDate from '../Hooks/useDate';
import DeleteIcon from '@mui/icons-material/Delete';
import useComment from '../Hooks/useComment';
import { useEffect } from 'react';
export default function ReactionBox({ deleteCommentloading, HandleDeleteComment, setComments, commentLength, commentsoading, addCommentLoading, commentext, AddToComment, setCommentText, openModal, setOpenModal, type, userArray }) {

    const handleClose = () => setOpenModal(false);
    const { DateForMat } = useDate()
    const { user } = useSelector(state => state.user)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [hoveredeId, setHoveredId] = useState()


    const HandleHover = (comment_id, hover) => {

        setHoveredId(comment_id)
        setVisibleDelete(hover)
    }




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
                    <div className='w-[100%] relative flex flex-col gap-3 overflow-auto h-[100%]'>
                        {
                            (

                                (type == "comments" && commentsoading && !userArray.length > 0) &&
                                Array.from({ length: 3 }).map((_, index) => {
                                    return (
                                        <div className={`w-[100%]  flex items-center  gap-4 relative`} key={index}>
                                            <div className='flex justify-center items-center '>
                                                <Skeleton variant="circular" width={40} height={40} animation="wave" />
                                            </div>

                                            <div className='lg:w-[300px] sm:w-[250px]  py-2 flex rounded-xl items-center  break-normal'>
                                                <Skeleton variant="rounded" width={210} height={40} animation="wave" />
                                            </div>

                                        </div>
                                    )
                                })

                            )
                        }
                        {
                            (type == "comments" && userArray?.length < 1 && !commentsoading) &&
                            <div className='w-[100%] flex flex-col  items-center  h-[100%]'>
                                <p className='font-bold opacity-70'> No Comments yet</p>
                                <Lottie
                                    animationData={Empty_comment}
                                    loop
                                    autoplay
                                    style={{ width: '250px', height: '250px', }}
                                />
                            </div>
                        }
                        {
                            userArray?.length > 0 && userArray?.map((data, index) => {
                                return (
                                    <div className={`w-[100%] flex gap-4 relative ${index == userArray.length - 1 && "pb-20"}`} key={index} onMouseOver={(e) => HandleHover(data.comment_id, true)} onMouseLeave={(e) => HandleHover(data.comment_id, false)} >
                                        <div className='flex justify-center items-center relative'>
                                            <img src={data?.profile_image} alt="user-image" className='sm:size-10 size-8  rounded-full cursor-pointer' />
                                            {type == 'reaction' &&
                                                <FavoriteIcon className='absolute -bottom-1 -right-1' style={{ color: "red" }} fontSize='small' />
                                            }
                                        </div>
                                        {
                                            type == 'reaction' &&
                                            <div>
                                                <p className='font-bold text-black opacity-90 cursor-pointer'>{data?.first_name} {data?.last_name}</p>
                                                <p className='text-xs text-black opacity-70'>{DateForMat(data?.time)}</p>
                                            </div>
                                        }
                                        {
                                            type == 'comments' &&
                                            <div className='flex flex-col gap-2'>
                                                <div className={` ${data?.comment_text.length > 26 ? 'lg:w-[310px] break-all' : 'lg:w-auto'} mt-2  sm:w-[250px] flex flex-col h-auto py-2 px-2 rounded-xl bg-[var(--HOVER-BG)] break-normal`}>
                                                    <p className='text-xs font-semibold text-black opacity-90 cursor-pointer pl-[7px] pr-[5px]'>{data?.first_name} {data?.last_name}</p>
                                                    <p className='text-xs  pl-[7px]'>{data?.comment_text}</p>
                                                </div>
                                                <div className='flex gap-4 pl-3 items-center'>
                                                    <p className='text-xs font-bold opacity-60' >{DateForMat(data?.time)}</p>
                                                    <p className='text-xs font-bold opacity-60 cursor-pointer hover:opacity-70' >Like</p>
                                                    <p className='text-xs font-bold opacity-60 cursor-pointer hover:opacity-70' >Reply  </p>
                                                </div>
                                            </div>
                                        }

                                        {
                                            (hoveredeId == data?.comment_id && data?.comenter == user?.uid && visibleDelete) ?
                                                <div className='text-xs h-[80%]  flex items-center font-bold opacity-60 cursor-pointer hover:opacity-70' onClick={() => HandleDeleteComment(data?.comment_id)}>
                                                    {
                                                        deleteCommentloading ?
                                                            <CircularProgress size={20} sx={{ opacity: "0.7", fontSize: '15px' }} />
                                                            :

                                                            <span className='size-6 rounded-full flex justify-center items-center hover:bg-[#DCDCDC]'>
                                                                <DeleteIcon fontSize='small' sx={{ opacity: "0.7", fontSize: '15px' }} />
                                                            </span>
                                                    }
                                                </div>

                                                :
                                                null
                                        }

                                    </div>
                                )
                            })
                        }
                        {
                            type == 'comments' &&
                            <div className='w-[100%] flex gap-3 bg-[var(--BACKGROUND-COLOR)]  items-center fixed bottom-2 z-50'>
                                <img src={user?.profile_image} alt="user-image" className='sm:size-8 size-6 rounded-full cursor-pointer' />
                                <div className='bg-[var(--HOVER-BG)]  flex gap-2 w-[80%] px-3 py-4 rounded-2xl'>
                                    <textarea
                                        name='Comment'
                                        rows={commentext?.length > 43 ? 2 : 1}
                                        style={{
                                            overflowY: 'scroll',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                            resize: 'vertical'
                                        }}
                                        value={commentext}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className='overflow-y-auto w-[90%] placeholder:text-sm outline-0'
                                        placeholder={`Comment as,${user?.first_name} ${user?.last_name}`}

                                    />

                                    <div className='h-[50px] flex flex-col justify-end cursor-pointer' onClick={AddToComment}>
                                        {
                                            addCommentLoading ?
                                                <CircularProgress size={20} /> :
                                                <SendIcon style={commentext?.length > 0 ? { opacity: "0.7" } : { opacity: "0.2" }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </Modal>
        </div>
    );
}
