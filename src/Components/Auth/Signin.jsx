import React from 'react'
import styles from "./auth.module.css"
import Logo from "../../assets/logo.svg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '../../Common/Button';
import Devider from '../../Common/Devider';

const Signin = () => {
    return (
        <div className={styles.AuthContainer}>
            <div className={styles.AuthLogoINfo} >
                <h1 className={styles.VibeHeading}>Vibe</h1>
                <h3 className={styles.VibeDesc} >Stay connected with your circle and discover what’s happening around the world.</h3>
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
                        />
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default Signin