import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar({ width }) {
    return (
        <Box sx={{ width: width }}>
            <LinearProgress />
        </Box>
    );
}
