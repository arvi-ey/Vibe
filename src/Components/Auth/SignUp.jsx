import React, { useEffect, useState } from 'react'
import styles from "./auth.module.css"
import Button from '../../Common/Button';
import Devider from '../../Common/Devider';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { RegisterValidationSchema } from '../../Validations/AuthValidationSchema';
import useSignup from '../../Hooks/useSignup';
import Loader from '../../Common/Loader';
import Alert from '../../Common/Alert';


const SignUp = () => {
    const navigate = useNavigate()
    const { UserSignUp, error, loading } = useSignup()
    const [errortext, setErrortext] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertText, setAlertText] = useState("")
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            mobile: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: RegisterValidationSchema,
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true
    });

    const HandleSignUp = async () => {
        formik.setTouched({
            first_name: true,
            last_name: true,
            mobile: true,
            email: true,
            password: true,
            confirm_password: true,
        });
        const errors = await formik.validateForm()
        if (Object.keys(errors).length > 0) return
        else {
            const values = {
                first_name: formik?.values?.first_name,
                last_name: formik?.values?.last_name,
                mobile: formik?.values?.mobile,
                email: formik?.values?.email,
                password: formik?.values?.password
            }
            const signUpres = await UserSignUp(values)
            if (signUpres?.statusCode == 400) setErrortext(signUpres?.message)
            else if (signUpres?.statusCode == 200 && signUpres?.data.uid) {
                setAlertOpen(true)
                setAlertText("Account created successfully.")
                setTimeout(() => {
                    navigate("/signin")
                    setAlertOpen(false)
                }, 2000)
            }
        }
    }


    return (
        <div className={styles.AuthContainer}>
            <div className={` h-full w-full flex flex-col justify-center items-center `} >
                <h1 className={` text-7xl font-bold text-[var(--PRIMARY-COLOR)] font-rubik`}>Vibe</h1>
                <Card sx={{ minWidth: 280 }} className={` h-[80%] ${styles.AuthBox}`} >
                    <CardContent className={`flex flex-col items-center justify-evenly h-full`}>
                        <div className='w-full flex gap-4'>
                            <TextField
                                id="first_name"
                                name='first_name'
                                label="FirstName"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik?.errors?.first_name && formik.touched.first_name}
                                helperText={(formik?.errors?.first_name && formik.touched.first_name) ? formik?.errors?.first_name : null}
                            />
                            <TextField
                                id="last_name"
                                name='last_name'
                                label="LastName"
                                variant="outlined"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik?.errors?.last_name && formik.touched.last_name}
                                helperText={(formik?.errors?.last_name && formik.touched.last_name) ? formik?.errors?.last_name : null}
                            />
                        </div>
                        <TextField
                            id="email"
                            name='email'
                            label="Email address"
                            variant="outlined"
                            className={` w-full`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.email && formik.touched.email}
                            helperText={(formik?.errors?.email && formik.touched.email) ? formik?.errors?.email : null}
                        />
                        <TextField
                            id="mobile"
                            name='mobile'
                            label="Phone number"
                            variant="outlined"
                            type='number'
                            className={` w-full`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.mobile && formik.touched.mobile}
                            helperText={(formik?.errors?.mobile && formik.touched.mobile) ? formik?.errors?.mobile : null}
                        />
                        <TextField
                            id="password"
                            name='password'
                            label="Create password"
                            variant="outlined"
                            type='password'
                            className={` w-full`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.password && formik.touched.password}
                            helperText={(formik?.errors?.password && formik.touched.password) ? formik?.errors?.password : null}
                        />
                        <TextField
                            id="confirm_password"
                            name='confirm_password'
                            label="Re enter password"
                            variant="outlined"
                            type='password'
                            className={` w-full`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik?.errors?.confirm_password && formik.touched.confirm_password}
                            helperText={(formik?.errors?.confirm_password && formik.touched.confirm_password) ? formik?.errors?.confirm_password : null}
                        />
                        {loading ? <Loader /> :
                            <div className='w-full h-18 flex justify-between items-center flex-col' >
                                <Button
                                    ButtonStyle={styles.ButtonStyle}
                                    TextStyle={styles.TextStyle}
                                    Text='Sign UP'
                                    Click={HandleSignUp}
                                />
                                <span className='text-red-600 font-medium font text-xs' >{errortext}</span>
                            </div>
                        }
                        <Devider />
                        <span
                            onClick={() => navigate("/signin")}
                            className='text-[var(--PRIMARY-COLOR)] text-sm cursor-pointer hover:text-[var(--SECONDARY-cOLOR)]' >Already have an account? go to login</span>
                    </CardContent>
                </Card>
            </div>
            <Alert
                message={alertText}
                open={alertOpen}
            />
        </div >
    )
}

export default SignUp