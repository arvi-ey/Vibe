import * as React from 'react';
import Menu from '@mui/material/Menu';
import CircularProgress from '@mui/material/CircularProgress';

export default function MenuBox({ anchorEl, items, setAnchorEl, OnClickMenu }) {
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const HandleMenuClick = async (title) => {
        await OnClickMenu(title)
    }

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                {
                    items?.map((data, index) => {
                        return (
                            <div onClick={() => HandleMenuClick(data?.title)} className='w-30 h-10 flex justify-center items-center font-semibold cursor-pointer text-l hover:text-[#301934]' key={index} >
                                <div style={{ padding: "8px" }} className='w-25 gap-2 hover:bg-[#E4E6E8] rounded-l flex justify-center items-center' >
                                    {/* <p className='flex gap-1 justify-center items-center'> */}
                                    {data?.icon}

                                    {data?.title}
                                    {/* </p> */}

                                </div>
                            </div>
                        )
                    })
                }
            </Menu>
        </div>
    );
}
