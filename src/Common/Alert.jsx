import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Alert({ open, message }) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            // onClose={handleClose}
            message={message}
        />
    );
}
