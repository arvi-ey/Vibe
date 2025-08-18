import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from "./profile.module.css";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import useUser from '../../Hooks/useUser';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const EditProfile = ({ open, setOpen, handleClose, handleOpen }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const { user } = useSelector(state => state.user);
    const [focusState, setFocusState] = useState();
    const { UpdateUser, error, loading } = useUser()
    const [inputtext, setInputText] = useState({
        uid: user?.uid || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        school: user?.school || "",
        country: user?.country || "",
        state: user?.state || "",
        city: user?.city || "",
        profession: user?.profession || "",
        gender: user?.gender || "",
        dob: user?.dob || "",
        relationship_status: user?.relationship_status || ""
    });
    const [initialValue, setinitialValue] = useState()

    useEffect(() => {
        setinitialValue({ ...user })
    }, [user])

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const styleWidth = windowSize < 650 ? "90%" : (windowSize > 650 && windowSize < 1000) ? "70%" : (windowSize > 1000 && windowSize < 1200) ? "60%" : "50%";

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: styleWidth,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '12px',
        maxHeight: '80vh',
        overflowY: 'auto',
        border: 'none',
        outline: 'none'
    };

    const userFieldobj = [
        {
            type: "text",
            placeholder: "First Name",
            name: "first_name",
            value: inputtext.first_name,
            label: "First Name"
        },
        {
            type: "text",
            placeholder: "Last Name",
            name: "last_name",
            value: inputtext.last_name,
            label: "Last Name"
        },
        {
            type: "text",
            placeholder: "School",
            name: "school",
            value: inputtext.school,
            label: "School"
        },
        {
            type: "text",
            placeholder: "Country",
            name: "country",
            value: inputtext.country,
            label: "Country"
        },
        {
            type: "text",
            placeholder: "State",
            name: "state",
            value: inputtext.state,
            label: "State"
        },
        {
            type: "text",
            placeholder: "City",
            name: "city",
            value: inputtext.city,
            label: "City"
        },
        {
            type: "text",
            placeholder: "Profession",
            name: "profession",
            value: inputtext.profession,
            label: "Profession"
        },
        {
            type: "text",
            placeholder: "Gender",
            name: "gender",
            value: inputtext.gender,
            label: "Gender"
        },
        {
            type: "select",
            placeholder: "Relationship Status",
            name: "relationship_status",
            value: inputtext.relationship_status,
            label: "Relationship Status",
            selectArray: [
                {
                    name: "Single",
                    value: "Single"
                },
                {
                    name: "In a relationship",
                    value: "In a relationship"
                },
                {
                    name: "Married",
                    value: "Married"
                },
            ]
        }
    ];

    const FocusInput = (data, type) => {
        if (type == "edit") {
            setFocusState(data.name);
        } else {
            setFocusState(null);
        }
    };

    const HandleUpdateValue = async (data) => {
        const updateObj = {
            [data.name]: inputtext[data.name]
        }
        try {
            const result = await UpdateUser(user.uid, updateObj)
            if (result.uid) {
                setFocusState(null)
                toast.success(`${data.label} updated `)
            }
        }
        catch (error) {
            toast(`${error.message}`)

        }
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='w-full'>
                        <div className='flex justify-between items-center border-b border-gray-200 pb-4'>
                            <span className='font-bold text-xl text-gray-800'>Update Profile</span>
                            <button
                                onClick={handleClose}
                                className='p-1 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
                            >
                                <CloseIcon className='text-gray-500 hover:text-gray-700' />
                            </button>
                        </div>
                        <div className='mt-6 space-y-6 overflow-y-auto max-h-[60vh] pr-2'>
                            {userFieldobj.map((data, index) => (
                                <div key={index} className="relative group">
                                    <div className='flex items-start justify-between gap-4'>
                                        <div className='flex-1'>
                                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                {data.label}
                                            </label>
                                            {data.type === "text" || data.type === "date" ? (
                                                <div className='relative'>
                                                    <input
                                                        name={data.name}
                                                        type={data.type}
                                                        value={inputtext[data.name]}
                                                        disabled={focusState !== data.name}
                                                        onChange={(e) => setInputText({ ...inputtext, [data.name]: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-lg border ${focusState === data.name
                                                            ? 'border-blue-500  bg-white'
                                                            : 'border-gray-300 bg-gray-50'} 
                                                            text-gray-700 focus:outline-none transition-all duration-200
                                                            ${focusState !== data.name && 'pr-10'}`}
                                                    />
                                                    {focusState !== data.name && (
                                                        <button
                                                            onClick={() => FocusInput(data, "edit")}
                                                            className='cursor-pointer absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                                                        >
                                                            <EditIcon fontSize='small' />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className='relative'>
                                                    <select
                                                        id="relationship_status"
                                                        name="relationship_status"
                                                        value={inputtext[data.name]}
                                                        disabled={focusState !== data.name}
                                                        onChange={(e) => setInputText({ ...inputtext, [data.name]: e.target.value })}
                                                        className={`w-full px-4 py-3 rounded-lg border ${focusState === data.name
                                                            ? 'border-blue-500 ring-2 ring-blue-200 bg-white'
                                                            : 'border-gray-300 bg-gray-50'} 
                                                            text-gray-700 focus:outline-none transition-all duration-700
                                                            ${focusState !== data.name && 'pr-10  transition-all duration-700'}`}
                                                    >
                                                        <option value="">Select Status</option>
                                                        {data.selectArray?.map((option, i) => (
                                                            <option value={option.value} key={i}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                    {focusState !== data.name && (
                                                        <button
                                                            onClick={() => FocusInput(data, "edit")}
                                                            className=' cursor-pointer absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                                                        >
                                                            <EditIcon fontSize='small' />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {focusState === data.name && (
                                            <div className='flex items-end h-[72px] gap-2'>
                                                <button
                                                    onClick={() => FocusInput(data, "cancel")}
                                                    className=' cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
                                                >
                                                    <CloseIcon fontSize='small' />
                                                </button>
                                                {
                                                    loading ?
                                                        <div className=' h-[100%] flex fle-col items-end'>
                                                            <CircularProgress size={20} />
                                                        </div> :

                                                        <button
                                                            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 ${(initialValue[data.name] == inputtext[data.name] || inputtext[data.name] == "") ? "opacity-40 cursor-auto" : "opacity-100 cursor-pointer"}`}
                                                            disabled={initialValue[data.name] == inputtext[data.name]}
                                                            onClick={() => HandleUpdateValue(data)}
                                                        >
                                                            Save
                                                        </button>
                                                }
                                            </div>
                                        )}
                                    </div>
                                    <Toaster
                                        position="top-center"
                                        reverseOrder={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfile;