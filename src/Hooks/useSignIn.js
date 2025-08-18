import { useState } from 'react';
import API from '../Api/Api';

const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const UserSignIn = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/auth/signin', credentials);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to sign in');
            return null;
        }
    };

    return { UserSignIn, loading, error };
};

export default useSignIn;
