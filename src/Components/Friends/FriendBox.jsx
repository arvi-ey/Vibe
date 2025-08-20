import React, { useEffect } from 'react';
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
import useDate from '../../Hooks/useDate';
import Demo from "../../assets/demo-user.png"
import useFriends from '../../Hooks/useFriend';
import { useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 160,
    height: 340,
    [theme.breakpoints.up('sm')]: {
        width: 200,
        height: 350
    },
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
    }
}));



const FriendBox = ({ data, keyValue, setfriendquests }) => {
    const { user } = useSelector(state => state.user)
    const { DateForMat } = useDate()
    const { HandleFriends } = useFriends()
    const [friends, setFriends] = useState(false)
    const [userData, setuserData] = useState()
    const [sentrequest, setSentrequest] = useState(false)

    // console.log(data)
    useEffect(() => {
        setuserData(data)
        if (data.status == "sent") {
            setFriends(false)
        }

    }, [data])


    const handleFriendRequest = async (status) => {
        if (status == "received") {
            setFriends(true)
        }
        if (status == "not") {
            setfriendquests(prev => prev.filter((data) => data.id != userData.id))
        }
        let payloadObj
        if (status == 'sent') {
            setSentrequest(!sentrequest)
            payloadObj = {
                sender: user?.uid,
                receiver: userData?.uid,
                status: status,
                sent_time: Date.now()
            }
        }
        else {
            payloadObj = {
                id: userData?.id,
                sender: userData?.sender,
                receiver: userData?.receiver,
                status: status,
                sent_time: Date.now()
            }
        }
        const result = await HandleFriends(payloadObj)
        if (status == "sent") {
            setuserData(prev => ({ ...prev, id: result.id, sender: result.sender, receiver: result.receiver }));
        }
    }


    return (
        <StyledCard sx={{ cursor: 'pointer' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', height: "100%", flexDirection: 'column', justifyContent: "space-between" }} key={keyValue}>
                <img src={data?.profile_image || Demo} alt="profile_image" className="w-full rounded-lg h-[80%]  object-cover" />
                <p className='font-bold w-full flex justify-center items-center'>{data?.first_name} {data?.last_name} </p>
                {
                    (data?.status == 'sent') &&

                    <p className='text-xs font-semibold flex justify-center items-center'>{DateForMat(data?.sent_time)} ago</p>
                }
                {
                    data?.status == 'sent' && user.uid == data?.sender ? (

                        <div className="mt-2 cursor-pointer rounded-md h-7 gap-1 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] sm:h-8 w-[95%] flex justify-center items-center px-2 sm:px-4"
                            onClick={() => handleFriendRequest('not')}
                        >
                            <CloseIcon fontSize="small" sx={{ opacity: "0.8" }} />
                            <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                Cancel Request
                            </p>
                        </div>
                    )
                        : data?.status == 'received' || friends ? (

                            <div className="cursor-pointer rounded-md h-8 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4">
                                <SendIcon fontSize="small" sx={{ color: "white", opacity: 0.8 }} />
                                <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                    Message
                                </p>
                            </div>
                        )
                            : data?.status == 'sent' && data.receiver == user.uid ? (
                                <div>

                                    <div className="mt-2 cursor-pointer rounded-md h-8 gap-1 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4"
                                        onClick={() => handleFriendRequest('received')}
                                    >
                                        <p className="text-xs font-bold whitespace-nowrap  sm:block text-white">
                                            Accept Request
                                        </p>
                                    </div>
                                    <div className="mt-2 cursor-pointer rounded-md h-8 gap-1 bg-[#E6E8EA] hover:bg-[hsl(180,6%,86%)] sm:h-9 w-[95%] flex justify-center items-center px-2 sm:px-4"
                                        onClick={() => handleFriendRequest('not')}
                                    >
                                        <p className="text-xs font-bold whitespace-nowrap  sm:block">
                                            Remove
                                        </p>
                                    </div>
                                </div>
                            )
                                : null
                }
            </CardContent>
        </StyledCard>
    );
};

export default FriendBox;