
import React, { useState } from "react";
import BG from "../../assets/SignUpBg.jpg"
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import ScreenLoading from "../../Common/ScreenLoading";
import toast, { Toaster } from 'react-hot-toast';
import styles from "./auth.module.css"
import useSignup from "../../Hooks/useSignup";
import CircularProgress from '@mui/material/CircularProgress';
import Lottie from 'lottie-react';
import SuccessFull from "../../assets/Animation/Successfull.json"
export default function SignUp() {
    const location = useLocation()
    const Navigate = useNavigate()
    const { UserSignUp } = useSignup()
    const locationstate = location.state || {}
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        country: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    const [countryList, setCountryList] = useState([])
    const [loading, setLoading] = useState()
    const [createdAccount, setcrreatedAccount] = useState(false)


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name')
            .then(res => res.json())
            .then(data => {
                const countries = data.map(c => ({
                    name: c.name.common,
                }));
                setCountryList(countries);
            });

    }, [])



    useEffect(() => {
        if (!locationstate.uid) Navigate(`/auth/verifyemail`)

    }, [locationstate])




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    useEffect(() => {
        if (createdAccount) {
            setTimeout(() => {
                setcrreatedAccount(false)
                Navigate("/signin")
            }, 1800)
        }
    }, [createdAccount])


    if (!locationstate || countryList?.length == 0) {
        return (
            <ScreenLoading />
        )
    }
    const handleSubmit = async () => {
        const { first_name, last_name, password, country, gender } = formData
        let missingFields = [];
        if (!first_name) missingFields.push("First Name");
        if (!last_name) missingFields.push("Last Name");
        if (!password) missingFields.push("Password");
        if (!country) missingFields.push("Country");
        if (!gender) missingFields.push("Gender");
        if (missingFields.length > 0) {
            toast(`Please enter ${missingFields.join(", ")}`, {
                icon: '😄',
                style: {
                    borderRadius: '10px',
                    fontWeight: "bold"

                },
            })
            return
        }
        else if (password.length < 8) {
            toast(` Password length must be 8 characters or longer.`, {
                icon: '🔐',
                style: {
                    borderRadius: '10px',
                    fontWeight: "bold"

                },
            })
            return

        }
        else if (password != formData.confirmPassword) {
            toast(`Password and confirm password must match.`, {
                icon: '😄',
                style: {
                    borderRadius: '10px',
                    fontWeight: "bold"

                },
            })
            return
        }
        else {
            setLoading(true)
            try {
                const locationstate = location.state || {}
                const payload = { first_name, last_name, password, country, gender, uid: locationstate.uid }
                const Result = await UserSignUp(payload)
                if (Result.data.uid) {
                    setcrreatedAccount(true)
                }

            }
            catch (error) {
                toast.error(error.message)

            }
            finally {
                setLoading(false)
            }
        }

    };

    return (
        <div className="flex h-screen bg-cover bg-center justify-center items-center min-h-screen bg-gradient-to-br  px-4"
        // style={{ backgroundImage: `url(${BG})` }}
        >
            {
                !createdAccount &&
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 text-center mb-2">Create Account</h2>

                    <div className="space-y-5">
                        <div className="relative">
                            <input
                                type="text"
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name*"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name*"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
                            >
                                <option value="">Select Country*</option>
                                {countryList?.map((c, i) => {
                                    return (
                                        <option key={i} value={c.name} className="flex items-center gap-4 cursor-pointer rounded-xl hover:bg-[aliceblue]">
                                            {c?.name}
                                        </option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                    className="accent-blue-500"
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                    className="accent-blue-500"
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    onChange={handleChange}
                                    className="accent-blue-500"
                                />
                                <span>Other</span>
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password*"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password*"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className={`bg-[var(--PRIMARY-COLOR)] ${!loading && "cursor-pointer"} w-full cursor-pointer flex justify-center items-center text-white py-3 rounded-lg hover:bg-blue-600 transition-all`}
                            onClick={handleSubmit}
                        >
                            {loading ?
                                <CircularProgress size={20} color='white' /> :
                                <span>Submit</span>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                createdAccount &&
                <div className={`h-[100%] w-[100%] flex justify-center flex-col items-center`} >
                    <Lottie
                        animationData={SuccessFull}
                        loop
                        autoplay
                        className={styles.verifyEmailAnimation}
                    />
                    <h1 className={`${styles.emailVerifiedText}`} >Account created successfully.</h1>
                </div>
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
}
