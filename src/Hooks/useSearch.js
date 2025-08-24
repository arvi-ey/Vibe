import React, { useState } from 'react'
import API from '../Api/Api'
import { UpdateSearchUser } from '../Redux/Slices/userSlicer'
import { useDispatch } from 'react-redux'


const useSearch = () => {
    const dispatch = useDispatch()
    const [searchLoading, setSearchLoading] = useState(false)

    const SearchUser = async (payload) => {
        setSearchLoading(true)
        try {
            const result = await API.post("user/searchuser", payload)
            if (result?.data?.statusCode == 200) {
                console.log(result.data.data)
                dispatch(UpdateSearchUser(result.data.data))
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setSearchLoading(false)

        }
    }

    return { SearchUser }
}

export default useSearch