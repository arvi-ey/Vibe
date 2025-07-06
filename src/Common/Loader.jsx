import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ size = 30 }) {
    return (
        <CircularProgress size={size} />
    );
}
