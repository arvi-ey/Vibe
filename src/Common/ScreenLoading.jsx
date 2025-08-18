import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loader from "../../src/assets/Animation/loader.json"
import Lottie from 'lottie-react';
import Logo from "../assets/logo.svg"

const ScreenLoading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center' >
            <img src={Logo} className='size-50' />
        </div>
    )
}

export default ScreenLoading