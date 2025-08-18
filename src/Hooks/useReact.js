import React from "react";
import { useState } from "react";
import API from "../Api/Api";

const useReact = () => {
    const [loading, setLoading] = useState(false)

    const HandleReaction = async (payload) => {
        try {
            const result = await API.post('react/setreaction', payload)
            if (result?.data.statusCode == 200) return result.data.data

        }
        catch (error) {
            throw error
        }

    }
    return { HandleReaction, loading }
}
export default useReact