import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 160,
    height: 240,
    [theme.breakpoints.up('sm')]: {
        width: 200,
        height: 280
    },
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
    }
}));

const FriendBox = ({ data, keyValue }) => {
    const { user } = useSelector(state => state.user)
    return (
        <StyledCard sx={{ cursor: 'pointer' }}>
            <CardContent sx={{ flexGrow: 1, }} key={keyValue}>
                <img src={data?.profile_image} alt="profile_image" className="w-full rounded-lg h-[80%]  object-cover" />
                <p className='font-bold w-full flex justify-center items-center'>{data?.first_name} {data?.last_name} </p>
                {
                    data?.status == 'sent' && user.uid == data?.sender ? (

                        <div className="cursor-pointer rounded-md h-7 gap-1 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] sm:h-8 w-[95%] flex justify-center items-center px-2 sm:px-4">
                            <CloseIcon fontSize="small" sx={{ opacity: "0.8" }} />
                            <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                Cancel Request
                            </p>
                        </div>
                    )
                        : data?.status == 'received' ? (

                            <div className="cursor-pointer rounded-md h-8 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4">
                                <SendIcon fontSize="small" sx={{ color: "white", opacity: 0.8 }} />
                                <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                    Message
                                </p>
                            </div>
                        )
                            : (

                                <div className="cursor-pointer rounded-md h-8 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4">
                                    <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                        Accept Request
                                    </p>
                                </div>
                            )
                }
            </CardContent>
        </StyledCard>
    );
};

export default FriendBox;