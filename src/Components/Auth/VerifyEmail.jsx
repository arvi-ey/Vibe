import React, { useEffect } from 'react'
import styles from "./auth.module.css"
import sendMail from "../../assets/send-mail.png"
import verifyMail from "../../assets/verifyEmail.png"
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'
import API from "../../Api/Api"
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Verification from "../../assets/Animation/Verification.json"
import Lottie from 'lottie-react';
// import { ToastContainer, toast } from 'react-toastify';
const VerifyEmail = () => {
    const navigate = useNavigate()
    const [errortext, setErrortext] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailsent, setEmailSent] = useState(false)
    const [uid, setUid] = useState(null)
    const [emailVerified, setEmailVerified] = useState(false)
    const [statecode, setStateCode] = useState({
        box1: "",
        box2: "",
        box3: "",
        box4: "",
        box5: "",
        box6: "",
    })
    const box1 = useRef()
    const box2 = useRef()
    const box3 = useRef()
    const box4 = useRef()
    const box5 = useRef()
    const box6 = useRef()




    const HandelCodeRequest = async () => {
        if (loading) return
        if (email.length == 0) {
            setErrortext("Please enter email")
            return
        }
        const checkemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (checkemail.test(email)) {
            try {
                setLoading(true)
                const result = await API.post(`auth/requestverificationcode`, { email })
                if (result.data.statusCode == 200) {
                    setEmailSent(true)
                    if (result.data.uid) setUid(result.data.uid)
                }
                else {
                    setErrortext(result.data.message)
                }
            }
            catch (error) {
                setErrortext("Failed to send verification code")
            }
            finally {
                setLoading(false)
            }

        } else {
            setErrortext("Invalid email format. Please check and try again..")
        }
    };
    const OnEmailChange = (e) => {
        if (loading) return
        setErrortext("")
        setEmail(e.target.value)
    }

    const HandleCodeChange = (e) => {
        setErrortext("")
        if (loading) return
        if (box1.current.value.length > 1 || box2.current.value.length > 1 || box3.current.value.length > 1 || box4.current.value.length > 1 || box5.current.value.length > 1 || box6.current.value.length > 1) return
        setStateCode({ ...statecode, [e.target.name]: e.target.value })
        if (e.target.name == "box1" && box1.current.value.length == 1) box2.current.focus()
        if (e.target.name == "box2" && box2.current.value.length == 1) box3.current.focus()
        if (e.target.name == "box3" && box3.current.value.length == 1) box4.current.focus()
        if (e.target.name == "box4" && box4.current.value.length == 1) box5.current.focus()
        if (e.target.name == "box5" && box5.current.value.length == 1) box6.current.focus()
    }

    useEffect(() => {
        if (emailVerified) {
            setTimeout(() => {
                navigate('/auth/signup', {
                    state: {
                        uid: uid
                    }
                })
                setEmailVerified(false)
            }, 1800)
        }
    }, [emailVerified])

    const HandleVerifyEmail = async () => {
        if (loading) return
        const code = Object.values(statecode).join("")
        try {
            setLoading(true)
            const result = await API.post(`auth/verifyEmail`, { uid, code })
            if (result.data.statusCode == 200) {
                // toast.success(result.data.message);
                setEmailVerified(true)
            }
            else {
                toast.error(result.data.message);
                setErrortext(result.data.message)
            }

        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className={`w-full h-screen  flex gap-4  flex-col justify-center items-center bg-[#F3F4F6]`}>
            {
                !emailVerified &&
                <h1 className='font-bold text-7xl text-[var(--PRIMARY-COLOR)] '>Vibe</h1>
            }
            {
                (emailsent == false && !emailVerified) &&
                <div className={`sm:w-[600px] pl-10 flex gap-5 flex-col lg:w-[650px] sm:h-50  rounded-2xl ${loading && "opacity-50"}  ${styles.requestEmailbox}`} >
                    <div>
                        <img src={sendMail} className='size-20' alt='mail' />
                    </div>
                    <div className='w-full flex flex-col gap-5  '>
                        <p className=' w-full font-bold text-2xl'>Please Enter your Email</p>
                        <p className='text-xs font-semibold opacity-80'>A certified email address guarantees secure and authenticated communication</p>
                    </div>
                    <div className='relative flex flex-col'>
                        <input
                            name='email'
                            value={email}
                            onChange={(e) => OnEmailChange(e)}
                            placeholder='example@gmail.com'
                            className={`outline-none w-[80%] bg-[#F0F0F0] border-1 border-[#bbc2ca] p-4 rounded-lg ${errortext.length > 0 && "border-red-600"}`}
                        />
                        {
                            errortext.length > 0 &&
                            <span className='text-xs font-bold -bottom-5 text-red-600 absolute' >{errortext}</span>
                        }
                    </div>
                    <div className={`flex gap-1 mt-4     ${styles.VerifyEmailButtonDiv}`}>
                        <div className={` ${!loading && "cursor-pointer"} w-[80%] bg-[var(--PRIMARY-COLOR)] text-white p-3 font-semibold rounded-lg hover:bg-[var(--SECONDARY-cOLOR)] flex justify-center items-center  ${styles.verifyEmailButton}`}
                            onClick={HandelCodeRequest}
                        >
                            {loading ?
                                <CircularProgress size={20} color='white' /> :
                                <span>
                                    Request verification code
                                </span>
                            }
                        </div>
                        {/* <div className={` ${!loading && "cursor-pointer"}  w-[40%] p-3 border-1 rounded-lg border-[var(--PRIMARY-COLOR)] text-[var(--PRIMARY-COLOR)] hover:bg-[var(--HOVER-BG)] flex justify-center items-center font-semibold hover:text-[var(--SECONDARY-cOLOR)] ${styles.verifyEmailButton}`}>
                            Already Have Code
                        </div> */}

                    </div>
                </div>
            }
            {
                (emailsent && !emailVerified) &&
                <div className={`sm:w-[600px] flex gap-5 flex-col items-center lg:w-[650px] sm:h-50 rounded-2xl ${loading && "opacity-50"}  ${styles.requestEmailbox}`} >

                    <img src={verifyMail} className='size-20 mt-5' alt='mail' />
                    <span className={`font-bold sm:text-3xl text-2xl ${styles.VeriFicationCodetext}`} >Verify your email address</span>
                    <span className={` font-semibold text-[10px] opacity-60`} >{`Enter the 6-digit code, sent to your email, ${email}`}</span>
                    <div className='w-[80%] flex justify-around relative'>
                        <input
                            name="box1"
                            value={statecode.box1}
                            onChange={HandleCodeChange}
                            ref={box1}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box1.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : "border-2 border-black"}   rounded-lg flex justify-center text-center items-center h-20 ${styles.input_verifycode}`}
                        />
                        <input
                            name="box2"
                            value={statecode.box2}
                            onChange={HandleCodeChange}
                            ref={box2}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box2.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : "border-2 border-black"}    rounded-lg flex justify-center text-center items-center h-20 ${styles.input_verifycode}`}
                        />
                        <input
                            name="box3"
                            value={statecode.box3}
                            onChange={HandleCodeChange}
                            ref={box3}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box3.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : " border-2 border-black"}    rounded-lg  flex justify-center text-center items-center h-20 ${styles.input_verifycode}`}
                        />
                        <div className=' flex justify-center items-center'>
                            <div className='h-1 w-3 bg-[#5a5b60] rounded-3xl' />
                        </div>
                        <input
                            name="box4"
                            value={statecode.box4}
                            onChange={HandleCodeChange}
                            ref={box4}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box4.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : " border-2 border-black"}    rounded-lg   flex justify-center text-center items-center h-20 ${styles.input_verifycode}`}
                        />
                        <input
                            name="box5"
                            value={statecode.box5}
                            onChange={HandleCodeChange}
                            ref={box5}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box5.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : " border-2 border-black"}    rounded-lg  flex justify-center text-center items-center h-20 ${styles.input_verifycode}`}
                        />
                        <input
                            name="box6"
                            value={statecode.box6}
                            onChange={HandleCodeChange}
                            ref={box6}
                            type="number"
                            className={` outline-none focus:border-2 focus:border-[var(--PRIMARY-COLOR)] ${errortext?.length > 0 && "border-2 border-red-600"} ${statecode.box6.length > 0 ? "border-2 border-[var(--PRIMARY-COLOR)]" : " border-2 border-black"}  rounded-lg flex justify-center text-center items-center ${styles.input_verifycode}`}
                        />
                        {
                            errortext.length > 0 &&
                            <span className='text-xs font-bold -bottom-5 text-red-600 absolute' >{errortext}</span>
                        }

                    </div>
                    <div className={`w-[100%] mt-3 flex flex-col justify-center items-center gap-1.5`}>
                        <div className={`bg-[var(--PRIMARY-COLOR)] ${!loading && "cursor-pointer"} hover:bg-[var(--SECONDARY-cOLOR)] flex justify-center items-center text-white font-semibold p-2 w-[80%] ${styles.verifyButton}`}
                            onClick={HandleVerifyEmail}
                        >
                            {loading ?
                                <CircularProgress size={20} color='white' /> :
                                <span>Verify Email</span>
                            }
                        </div>
                        <div className={`text-[var(--PRIMARY-COLOR)] font-semibold ${!loading && "cursor-pointer"} hover:text-[var(--SECONDARY-cOLOR)]`}>
                            <span>Resend code</span>
                        </div>
                    </div>
                </div>
            }
            {
                emailVerified &&
                <div className={`h-[100%] w-[100%] flex justify-center flex-col items-center`} >
                    <Lottie
                        animationData={Verification}
                        loop
                        autoplay
                        className={styles.verifyEmailAnimation}
                    />
                    <h1 className={`${styles.emailVerifiedText}`} >Your email address has been verified successfully.</h1>
                </div>
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    )
}

export default VerifyEmail