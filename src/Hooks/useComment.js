import React from 'react'
import { useState } from 'react'
import API from '../Api/Api'

const useComment = () => {
    const [commentLoading, setCommentLoading] = useState(false)

    const AddComment = async (payload) => {
        setCommentLoading(true)
        try {
            const result = await API.post('comment/addcomment', payload)
            if (result.data.statusCode == 200) return result.data.data
        }
        catch (error) {
            throw error
        }
        finally {
            setCommentLoading(false)
        }
    }
    const GetPostComments = async (payload) => {
        try {
            const result = await API.post('comment/getposcomments', payload)
            if (result.data.statusCode == 200) return result.data.data
        }
        catch (error) {
            throw error
        }
    }
    const DeleteComment = async (payload) => {
        try {
            const result = await API.post('comment/deletecomment', payload)
            if (result.data.statusCode == 200) return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    return { AddComment, commentLoading, GetPostComments, DeleteComment }
}

export default useComment