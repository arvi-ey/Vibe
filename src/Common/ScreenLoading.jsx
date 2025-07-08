import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loader from "../../src/assets/Animation/loader.json"
import Lottie from 'lottie-react';

const ScreenLoading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center' >
            <Lottie
                animationData={Loader}
                loop
                autoplay
            />
        </div>
    )
}

export default ScreenLoading