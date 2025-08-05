import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import Upload_Image from "../../assets/Upload_image.png"
import Button from "../../Common/Button"
import { useRef } from 'react';
import usePost from '../../Hooks/usePost';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import DemoUser from "../../assets/demo-user.png"
import ProgressBar from '../../Common/ProgressBar';
import Alert from '../../Common/Alert';
import useStory from '../../Hooks/useStory';
export default function CreatePost({ openModal, setOpenPostModal, setUploadpost, clickedicon, postType }) {
    const handleClose = () => {
        setOpenPostModal(false);
    }
    const { UploadPost, loading, UploadUserImage } = usePost()
    const { AddToStory, storyloading } = useStory()
    const { postdata } = useSelector(state => state.post)
    const { user } = useSelector(state => state.user)
    const inputRef = useRef();
    const [desc, setDesc] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);
    const [showCrop, setShowCrop] = useState()
    const imgRef = useRef();
    const [crop, setCrop] = useState({
        unit: '%',
        width: 90,
        height: 90,
        x: 5,
        y: 5
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const HandleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setShowCrop(true)
        }

    }

    const HandleDescription = (e) => {
        setDesc(e.target.value)
    }
    const onImageLoaded = (img) => {
        imgRef.current = img;
        setCrop({
            "x": 31.160037231445312,
            "y": 28.746249389648426,
            "width": 388.08001098632815,
            "height": 258.71624450683595,
            "unit": "px"
        })
        setCompletedCrop(crop);
        return false;
    };

    const onCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                const file = new File([blob], fileName, { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                resolve({ file, url });
            }, 'image/jpeg');
        });
    };
    const handleCropImage = async () => {
        const imgElement = imgRef.current;

        if (
            imgElement &&
            imgElement instanceof HTMLImageElement &&
            completedCrop?.width &&
            completedCrop?.height
        ) {
            const croppedResult = await getCroppedImg(
                imgElement,
                completedCrop,
                'cropped-image.jpg'
            );
            setImageFile(croppedResult.file);
            setCroppedImageUrl(croppedResult.url);
            setShowCropper(false);
        } else {
            console.error("Image is not ready or crop is invalid.");
        }
        setShowCrop(false);
    };


    const handleCancelCrop = () => {
        setShowCropper(false);
        setImageFile(null);
        setImagePreview(null);
    };

    const AddNewPost = async () => {
        const formData = new FormData()
        if (imageFile) formData.append("image", imageFile)
        formData.append("userid", user?.uid)
        formData.append("caption", desc || "")
        formData.append("time", Date.now())
        formData.append("post_type", postType)
        if (postType == "Feed") {
            const result = await UploadPost(formData)
            if (result?.postid) {
                setOpenPostModal(false)
                setUploadpost(true)
            }
        }
        else {
            const result = await UploadUserImage(formData)
            console.log(result)
            if (result?.postid) {
                setOpenPostModal(false)
                setUploadpost(true)
            }

        }
    }

    const AddNewStory = async () => {
        const formData = new FormData()
        if (imageFile) formData.append("image", imageFile)
        formData.append("uploader", user?.uid)
        formData.append("caption", desc || "")
        formData.append("time", Date.now())
        const result = await AddToStory(formData)
        if (result?.storyid) {
            setOpenPostModal(false)
            setUploadpost(true)
        }
    }


    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (croppedImageUrl) URL.revokeObjectURL(croppedImageUrl);
        };
    }, [imagePreview]);


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
                {
                    showCrop ?
                        <div className="w-auto h-auto max-w-[90vw] max-h-[90vh] 
                flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-lg shadow-xl outline-none overflow-hidden gap-2" style={{ padding: "20px" }}>
                            {imagePreview && (
                                <>
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={onCropChange}
                                            circularCrop={postType == "profile_image"}
                                            onComplete={onCropComplete}
                                            aspect={1}
                                            className="w-auto h-auto max-w-full max-h-[70vh]"
                                        >
                                            <img
                                                ref={(el) => {
                                                    if (el) imgRef.current = el;
                                                }}
                                                src={imagePreview}
                                                alt="Crop preview"
                                                onLoad={onImageLoaded}
                                                className="max-w-full max-h-[70vh] object-contain"
                                            />
                                        </ReactCrop>
                                    </div>
                                    <div className="flex justify-center pb-2">
                                        <Button
                                            ButtonStyle="px-6 w-[200px] h-[40px] py-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] rounded-md"
                                            Text="Crop Image"
                                            TextStyle="text-[var(--BACKGROUND-COLOR)] font-medium text-sm"
                                            Click={handleCropImage}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        :
                        <div
                            className="w-[90vw] sm:w-[80vw] md:w-[500px] lg:w-[550px] xl:w-[600px] max-w-[95%] h-[400px]
                sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] flex flex-col 
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white rounded-lg shadow-xl outline-none overflow-hidden gap-2">
                            <div className='flex flex-col h-12 w-ful justify-center items-center relative border-b-1 border-[#eae6e6]' >
                                {
                                    postType == "profile_image" ?
                                        <p className='font-bold opacity-80' >Upload Profile Photo</p> :

                                        postType == "cover_photo" ?
                                            <p className='font-bold opacity-80' >Upload Cover Photo</p> :
                                            <p className='font-bold opacity-80' >{postType}</p>
                                }
                                {(clickedicon && clickedicon == "Live Video") &&
                                    <p className='font-semibold text-xs text-[var(--PRIMARY-COLOR)]' >The live video feature is not currently available, but photo uploads are fully supported.</p>
                                }
                                {(clickedicon && clickedicon == "Photo/Video") &&
                                    <p className='font-semibold text-xs text-[var(--PRIMARY-COLOR)]' >Video uploads are not currently available, but photo uploads are fully suppported</p>
                                }
                                <span className='absolute right-2 h-7 w-7 rounded-3xl bg-[#E2E5E9] flex justify-center items-center cursor-pointer hover:bg-[#d4d6d6]' onClick={handleClose}>
                                    <CloseIcon fontSize='small' />
                                </span>
                            </div>
                            <div className='w-full flex items-center gap-2' style={{ paddingLeft: "10px" }} >
                                <img src={user?.profile_image || DemoUser} alt="UserAccount" className='h-8 w-8 rounded-full' />
                                <p className='font-bold text-xs opacity-70 ' >{`${user?.first_name} ${user?.last_name}`}</p>
                            </div>
                            <div className='w-full h-[50%]flex' style={{ paddingLeft: "10px", marginTop: "5px" }} >
                                <textarea
                                    placeholder={`What's on your mind, ${user?.first_name}?`}
                                    className="w-full px-4 pb-2 text-base placeholder:text-gray-500 placeholder:text-lg placeholder:font-medium resize-none outline-none 
                            min-h-[80px] max-h-[150px] overflow-y-auto"
                                    rows={10}
                                    value={desc}
                                    onChange={HandleDescription}
                                />
                            </div>
                            {
                                imageFile ?
                                    <div className='w-full' >
                                        <div className='relative inline-flex h-20' style={{ marginLeft: "10px" }}>
                                            <img src={croppedImageUrl} alt='preview' className='h-full object-contain rounded-xl'
                                            />
                                            <span
                                                className='h-5 w-5 absolute right-0   rounded-3xl bg-[#E2E5E9] flex justify-center items-center cursor-pointer hover:bg-[#d4d6d6]'
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setImagePreview(null);
                                                    setCroppedImageUrl(null);
                                                }}

                                            >
                                                <CloseIcon fontSize='small' />
                                            </span>
                                        </div>
                                    </div>
                                    :
                                    <div className='h-20 w-full flex justify-center relative items-center ' >

                                        <div className='w-[90%] h-full flex-col flex justify-center items-center cursor-pointer hover:bg-[#f7fbff] rounded-xl border-2 border-dashed border-[#dae6f2]'
                                            onClick={handleClick}
                                        >
                                            <img src={Upload_Image} alt='upload_image' className='h-8 w-8 opacity-35' />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={inputRef}
                                                onChange={HandleUploadImage}
                                                className="hidden"
                                            />
                                            <p className='font-bold text-sm text-gray-500' >Drag image, or <span className='text-[var(--PRIMARY-COLOR)]' >browse</span> </p>
                                            <p className='font-medium text-[0.6rem] text-gray-500' >Supports: JPG,JPEG20000,PNG</p>
                                        </div>
                                    </div>



                            }
                            <div className='h-10 w-full flex justify-center items-center'>
                                {
                                    loading || storyloading ?
                                        <div className='w-full flex justify-center items-center flex-col'>
                                            <ProgressBar
                                                width="90%"
                                            />
                                            <p className='font-bold opacity-60'>Uploading</p>
                                        </div>
                                        :
                                        <Button
                                            ButtonStyle={`w-[90%] bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] rounded-md`}
                                            Text={postType == "Story" ? "Upload Story" : "post"}
                                            TextStyle={`text-[var(--BACKGROUND-COLOR)] font-bold text-sm`}
                                            Click={postType == "Story" ? AddNewStory : AddNewPost}
                                        />
                                }
                            </div>
                        </div>
                }
            </Modal>
        </div>
    );
}
