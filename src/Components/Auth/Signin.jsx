import React, { useState } from 'react'
import styles from "./auth.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '../../Common/Button';
import Devider from '../../Common/Devider';
import { useNavigate } from 'react-router';
import { LoginvalidationSchema } from "../../Validations/AuthValidationSchema"
import { useFormik } from 'formik';
import useSignIn from '../../Hooks/useSignIn';
import Loader from '../../Common/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddUserID } from '../../Redux/Slices/authSlicer';
const Signin = () => {
    const navigate = useNavigate()
    const { error, loading, UserSignIn } = useSignIn()
    const [errortext, setErrorText] = useState(null)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginvalidationSchema,
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true
    })

    const handleSignIn = async () => {
        formik.handleSubmit()
        const { email, password } = formik?.values
        if (!email || !password || password.length < 8) return
        else {
            const SignInResponse = await UserSignIn(formik?.values)
            if (SignInResponse?.statusCode == 400) {
                setErrorText(SignInResponse.message)
            }
            else if (SignInResponse?.statusCode == 200 && SignInResponse?.data?.uid) {
                dispatch(AddUserID(SignInResponse.data.uid))
                navigate("/")
            }
        }
    }


    useEffect(() => {
        setErrorText(error)
    }, [error])


    return (
        <div className={styles.AuthContainer}  >
            <div className={styles.AuthLogoINfo} >
                <h1 className={` text-7xl font-bold text-[var(--PRIMARY-COLOR)] font-rubik`}>Vibe</h1>
                <h3 className={`text-lg w-110`} >Stay connected with your circle and discover what’s happening around the world.</h3>
            </div>
            <div className={styles.AuthBoxDiv} >
                <Card sx={{ minWidth: 275 }} className={styles.AuthBox} >
                    <CardContent className={styles.AuthBoxContainer}>
                        <TextField
                            id="email"
                            label="Enter your email id*"
                            variant="outlined"
                            className={styles.AuthInputBox}
                            autoFocus={false}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.email && formik.touched.email}
                            helperText={formik?.errors?.email}
                        />
                        <TextField
                            id="password"
                            label="Enter password*"
                            variant="outlined"
                            className={styles.AuthInputBox}
                            type='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.password && formik.touched.password}
                            helperText={formik?.errors?.password}
                        />
                        {loading ? <Loader /> :
                            <div className='w-full h-18 flex justify-between items-center flex-col' >
                                <Button
                                    ButtonStyle={styles.ButtonStyle}
                                    TextStyle={styles.TextStyle}
                                    Text='Log In'
                                    Click={handleSignIn}
                                />
                                <span className='text-red-600 font-medium font text-xs' >{errortext}</span>
                            </div>
                        }
                        <span className={styles.ForgetPassword} >Forgot password ?</span>
                        <Devider />
                        <Button
                            ButtonStyle={styles.OptionButton}
                            TextStyle={styles.OptionButtontext}
                            Text='Create New Account'
                            Click={() => navigate("/signup")}
                        />
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default Signin