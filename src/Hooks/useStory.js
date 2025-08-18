import React from 'react'
import API from '../Api/Api'
import { useState } from 'react'
import { GetAllHomeStories, AddUserStory, GetUserStories } from '../Redux/Slices/storySlicer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const useStory = () => {
    const [storyloading, setStoryLoading] = useState(false)
    const [Userstoryloading, setUserStoryLoading] = useState(false)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()


    const AddToStory = async (payload) => {
        setStoryLoading(true)
        try {
            const result = await API.post("/story/uploadstory", payload)
            if (result?.data?.statusCode == 200) {
                dispatch(AddUserStory(result?.data?.data))
                return result?.data?.data;
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setStoryLoading(false)
        }
    }
    const GetHomeStories = async (payload) => {
        setStoryLoading(true)
        try {
            const result = await API.post("/story/gethomestories", payload)
            if (result?.data?.statusCode == 200) {
                dispatch(GetAllHomeStories(result?.data?.data))
                return result?.data?.data;
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setStoryLoading(false)
        }
    }
    const FetchUserStories = async (payload) => {
        setUserStoryLoading(true)
        try {
            const result = await API.post("/story/getuserstories", payload)
            if (result?.data?.statusCode == 200) {
                dispatch(GetUserStories(result?.data?.data))
                return result?.data?.data;
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setUserStoryLoading(false)
        }
    }



    return {
        AddToStory,
        storyloading,
        GetHomeStories,
        FetchUserStories

    }
}

export default useStory