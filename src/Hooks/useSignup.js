import { useState } from 'react';
import API from '../Api/Api';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const UserSignUp = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/auth/createUser', credentials);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to sign in');
            return null;
        }
    };

    return { UserSignUp, loading, error };
};

export default useSignup;
