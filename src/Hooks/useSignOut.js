import { useState } from 'react';
import API from '../Api/Api';

const useSignOut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const UserSignOut = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.get('/auth/signout');
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to sign out');
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    return { UserSignOut, loading, error };
};

export default useSignOut;
