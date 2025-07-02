import React from 'react'
import styles from "./auth.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '../../Common/Button';
import Devider from '../../Common/Devider';
import { useNavigate } from 'react-router';

const Signin = () => {
    const navigate = useNavigate()
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
                            id="Email"
                            label="Email address or phone number"
                            variant="outlined"
                            className={styles.AuthInputBox}
                        />
                        <TextField
                            id="Email"
                            label="Email address or phone number"
                            variant="outlined"
                            className={styles.AuthInputBox}
                        />
                        <Button
                            ButtonStyle={styles.ButtonStyle}
                            TextStyle={styles.TextStyle}
                            Text='Log In'
                        />
                        <span className={styles.ForgetPassword} >Forget password ?</span>
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