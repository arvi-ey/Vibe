import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../Api/Api"
import { AddUserID } from "../Redux/Slices/authSlicer";
import { AddUserdata } from "../Redux/Slices/userSlicer";

const useAuth = () => {
    const { user } = useSelector(state => state.user)
    const [userdata, setuserdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            checkAuth();
        }
        if (user) {
            setuserdata(user)
            setLoading(false)
        }
    }, [dispatch, user]);

    const checkAuth = async () => {
        try {
            const response = await API.post(`auth/checkauth`)
            if (response?.data?.data?.uid) {
                setuserdata(response?.data?.data)
                dispatch(AddUserdata(response?.data?.data))
            }
            else {
                setuserdata(null)
                dispatch(AddUserdata(null))

            }
        }
        catch (error) {
            setuserdata(null)
        }
        finally {
            setLoading(false)
        }

    };
    return { userdata, loading };
};

export default useAuth;


