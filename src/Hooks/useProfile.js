import React from 'react'
import { useState } from 'react'
import { AddProfileInfo } from '../Redux/Slices/profileSlicer'
import { useDispatch } from 'react-redux'
import API from '../Api/Api'

const useProfile = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()



    const GetUserProfileData = async (uid) => {
        setLoading(true);
        try {
            const response = await API.get(`/user/getprofileData/${uid}`);
            if (response?.data?.statusCode == 200 && response?.data?.data?.uid) dispatch(AddProfileInfo(response?.data?.data))
            else dispatch(AddUserdata(null))
        } catch (err) {
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    return { GetUserProfileData, loading };
}

export default useProfile