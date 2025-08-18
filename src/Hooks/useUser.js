import { useState } from 'react';
import API from '../Api/Api';
import { useDispatch } from 'react-redux';
import { AddUserdata } from '../Redux/Slices/userSlicer';

const useUser = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const GetUserByID = async (uid) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.get(`/user/getuser/${uid}`);
            if (response?.data?.statusCode == 200 && response?.data?.data?.uid) dispatch(AddUserdata(response?.data?.data))
            else dispatch(AddUserdata(null))
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to get user');
            return null;
        }
        finally {
            setLoading(false);
        }
    };
    const UpdateUser = async (uid, payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.patch(`/user/updateuser/${uid}`, payload);
            if (response?.data?.statusCode == 200 && response?.data?.data?.uid) {
                dispatch(AddUserdata(response?.data?.data))
                return response?.data?.data
            }
            else dispatch(AddUserdata(null))
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to update');
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    return { GetUserByID, loading, error, UpdateUser };
};

export default useUser;
