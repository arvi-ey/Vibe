import React, { use } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API from '../Api/Api'
import { AddFriends, GetFriends } from '../Redux/Slices/friendSlicer'

const useFriends = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { friends } = useSelector(state => state.friend)

    const HandleFriends = async (body) => {
        try {
            const result = await API.post(`friend/sendrequest`, body)
            if (result?.data?.statusCode == 200) {
                if (result.data.data.status == 'received') {
                    dispatch(AddFriends(result?.data?.data))
                }
                return result?.data?.data
            }
        }
        catch (error) {

        }
    }


    const CheckFriend = async (body) => {
        try {
            const result = await API.post(`friend/checkfriend`, body)
            if (result?.data?.statusCode == 200) return result?.data?.data
            if (result?.data?.statusCode == 201) return null
        }
        catch (error) {
            throw error
        }
    }


    const GetUserFriends = async (body) => {
        if (friends?.length < 0) return
        setLoading(true)
        try {
            const result = await API.post(`friend/getfriends`, body)
            if (result?.data?.statusCode == 200) {
                dispatch(GetFriends(result?.data?.data))
                return result?.data?.data
            }
            if (result?.data?.statusCode == 201) return []
        }
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }
    }
    const GetUserRequests = async (body) => {
        setLoading(true)
        try {
            const result = await API.post(`friend/getfriendrequest`, body)
            if (result?.data?.statusCode == 200) {
                return result?.data?.data
            }
            if (result?.data?.statusCode == 201) return []
        }
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }
    }
    const GetUserSuggesition = async (body) => {
        setLoading(true)
        try {
            const result = await API.post(`user/getsuggesition`, body)
            if (result?.data?.statusCode == 200) {
                return result?.data?.data
            }
            if (result?.data?.statusCode == 201) return []
        }
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }
    }



    return { loading, GetUserSuggesition, HandleFriends, CheckFriend, GetUserFriends, GetUserRequests };
}

export default useFriends


