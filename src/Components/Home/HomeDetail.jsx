import React, { useEffect, useState } from 'react'
import { Search } from "lucide-react";
import styles from "./home.module.css"
import HomeSearchBar from './HomeSearchBar';
import useFriends from '../../Hooks/useFriend'
import { useSelector, useDispatch } from 'react-redux';
import HomeDetailFriend from './HomeDetailFriend';
import useSearch from '../../Hooks/useSearch';
import { UpdateSearchUser } from '../../Redux/Slices/userSlicer';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
const HomeDetail = () => {
    const dispatch = useDispatch()
    const { user, searchuser } = useSelector(state => state.user)
    const { GetUserRequests, GetUserSuggesition, loading } = useFriends()
    const { SearchUser } = useSearch()
    const [friendquests, setfriendquests] = useState([])
    const [suggesition, setsuggesition] = useState([])
    const [searchtext, setSearchText] = useState("")
    const [focusSearch, setFocusSearch] = useState(false)
    const [searchCached, setsearchCached] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        SearchUser({ text: searchtext })
        if (searchtext.length == 0) {
            dispatch(UpdateSearchUser([]))
        }
    }, [searchtext])

    useEffect(() => {
        const getFriends = async () => {
            const suggesition = await GetUserSuggesition({ uid: user?.uid })
            setsuggesition(suggesition)
            const payload = {
                uid: user?.uid,
                type: "receiver",
                limit: 5
            }
            const data = await GetUserRequests(payload)
            setfriendquests(data)
        }
        getFriends()
    }, [user?.uid])

    const HandleNavigateToProfile = (data) => {
        let localstorageData
        if (searchCached?.length > 0) {
            const filteredData = searchCached?.filter(val => val.uid != data.uid)
            localstorageData = [data, ...filteredData]
        }
        else {
            localstorageData = [data]
        }
        localStorage.setItem("search", JSON.stringify(localstorageData))
        navigate(`profile/${data.uid}`)

    }

    const RemoveSearch = (data) => {
        const latestArray = searchCached?.filter(val => val.uid !== data?.uid)
        setsearchCached(latestArray)
        localStorage.setItem("search", JSON.stringify(latestArray))

    }

    return (
        <div className={`flex flex-col  items-center ${styles.home_detail_container} `}>
            <div className='w-full relative flex flex-col items-center'>

                <HomeSearchBar
                    searchtext={searchtext}
                    setSearchText={setSearchText}
                    setFocusSearch={setFocusSearch}
                    focusSearch={focusSearch}
                    setsearchCached={setsearchCached}


                />
                {
                    focusSearch &&
                    <div className={`w-[90%] shadow-2xl p-4 rounded-lg absolute bg-white h-auto min-h-24 max-h-96 overflow-auto flex flex-col z-50 top-18 mr-2`} >
                        {
                            (searchuser.length == 0 && (searchCached?.length == 0 || searchCached == null)) &&
                            <p className='text-center opacity-50 '>Try Searching for people, list or keyword</p>
                        }
                        {
                            (searchCached?.length > 0 && searchuser?.length == 0) &&
                            <div className='w-[100%] flex flex-col gap-1'>
                                <p className='opacity-50 font-bold '>Recent</p>
                                {
                                    searchCached?.map((data, index) => {
                                        return (
                                            <div className='w-[100%] flex gap-2 items-center cursor-pointer hover:bg-[var(--HOVER-BG)] p-4 rounded-lg z-50 opacity-90' key={data.uid}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    HandleNavigateToProfile(data, "stored");
                                                }}

                                            >
                                                <img src={data?.profile_image} alt='search-user' className='size-10 rounded-full' />
                                                <span className='font-bold opacity-70' >{data.name}</span>
                                                <div className='size-6 rounded-full flex justify-center items-center ml-auto hover:bg-[#cdced1]' onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation();
                                                    RemoveSearch(data)
                                                }} >
                                                    <CloseIcon fontSize='small' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        <div className='w-[100%] flex flex-col gap-1'>

                            {
                                searchuser?.map((data, index) => {
                                    return (
                                        <div className='w-[100%] flex gap-2 items-center cursor-pointer hover:bg-[var(--HOVER-BG)] p-4 rounded-lg z-50' key={data.uid}

                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                HandleNavigateToProfile(data, "searched");
                                            }}

                                        >
                                            <img src={data?.profile_image} alt='search-user' className='size-10 rounded-full' />
                                            <span className='font-bold opacity-70' >{data.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            {
                suggesition.length > 0 &&
                <div className={`flex flex-col  w-[100%]`}>
                    <HomeDetailFriend
                        friendquests={suggesition}
                        type="suggested"
                    />

                </div>
            }
            {
                friendquests.length > 0 &&
                <div className={`flex flex-col  w-[100%]`}>
                    <HomeDetailFriend
                        friendquests={friendquests}
                        type="request"
                    />

                </div>
            }
            {/* <div className={`flex pl-10 flex-col gap-2 w-[100%]`}>
                <p className={` font-bold md:text-lg lg:text-xl  opacity-60 `} >Subscribe to Premium</p>
                <p className={` font-semibold md:text-xs lg:text-sm  opacity-60 `}>Subscribe to unlock new features and if eligible, receive a share of revenue.
                    <span className={`text-[#0000FF] cursor-pointer text-xs hover:text-[var(--PRIMARY-COLOR)]`}> See more...</span>
                </p>
                <div className={`w-50 p-2 bg-[var(--PRIMARY-COLOR)] hover:bg-[var(--SECONDARY-cOLOR)] cursor-pointer rounded-2xl flex justify-center items-center`}>
                    <span className={`font-semibold text-white`} >Subscribe</span>
                </div>
            </div> */}
        </div >
    )
}

export default HomeDetail