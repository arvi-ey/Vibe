import React from 'react'
import styles from "./auth.module.css"
import Button from '../../Common/Button';
import Devider from '../../Common/Devider';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';



const SignUp = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.AuthContainer}>
            <div className={` h-full w-full flex flex-col justify-center items-center `} >
                <h1 className={` text-7xl font-bold text-[var(--PRIMARY-COLOR)] font-rubik`}>Vibe</h1>
                <Card sx={{ minWidth: 280 }} className={` h-[80%] ${styles.AuthBox}`} >
                    <CardContent className={`flex flex-col items-center justify-evenly h-full`}>
                        <div className='w-full flex gap-4'>
                            <TextField
                                id="FirstName"
                                label="FirstName"
                                variant="outlined"
                            />
                            <TextField
                                id="LastName"
                                label="LastName"
                                variant="outlined"
                            />
                        </div>
                        <TextField
                            id="Email"
                            label="Email address"
                            variant="outlined"
                            className={` w-full`}
                        />
                        <TextField
                            id="Phone"
                            label="Phone number"
                            variant="outlined"
                            type='number'
                            className={` w-full`}
                        />
                        <TextField
                            id="Password"
                            label="Create password"
                            variant="outlined"
                            type='password'
                            className={` w-full`}
                        />
                        <TextField
                            id="Confirm Password"
                            label="Re enter password"
                            variant="outlined"
                            type='password'
                            className={` w-full`}
                        />
                        <Button
                            ButtonStyle={styles.ButtonStyle}
                            TextStyle={styles.TextStyle}
                            Text='Sign UP'
                        />
                        <Devider />
                        <span
                            onClick={() => navigate("/signin")}
                            className='text-[var(--PRIMARY-COLOR)] text-sm cursor-pointer hover:text-[var(--SECONDARY-cOLOR)]' >Already have an account? go to login</span>
                    </CardContent>
                </Card>

            </div>
        </div >
    )
}

export default SignUp