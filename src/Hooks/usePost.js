import React, { use } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import API from '../Api/Api'
import { AddPost, GetAllPost, DeleteHomePost } from '../Redux/Slices/postSlicer'
import useUser from './useUser'
import { SetProfilePosts, AddProfilePost, DeleteProfilePost } from '../Redux/Slices/profileSlicer'
const usePost = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { GetUserByID } = useUser()



    const UploadPost = async (formData) => {
        setLoading(true);
        try {
            const response = await API.post(`/post/uploadpost`, formData);
            if (response?.data?.statusCode == 200 && response?.data?.data?.postid) {
                const responsedata = response?.data?.data
                const postobj = {
                    postid: responsedata?.postid,
                    caption: responsedata?.caption,
                    image: responsedata?.image,
                    post_type: responsedata?.post_type,
                    time: responsedata?.time,
                    userinfo: {
                        uid: responsedata?.uid,
                        first_name: responsedata?.first_name,
                        last_name: response?.last_name,
                        profile_image: responsedata?.profile_image
                    },
                    likes: [],
                    comments: []
                }
                dispatch(AddPost(postobj))
                dispatch(AddProfilePost(postobj))
                return response?.data?.data;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
        finally {
            setLoading(false);
        }
    };
    const GetHomePosts = async (userData) => {
        setLoading(true);
        try {
            const response = await API.post(`/post/gethomepost`, userData);
            if (response.data.statusCode == 200) {
                // dispatch(AddPost(response?.data?.data))
                dispatch(GetAllPost(response.data.data))
            }
        } catch (err) {
            return null;
        }
        finally {
            setLoading(false);
        }
    };
    const GetProfilePosts = async (uid) => {
        setLoading(true);
        try {
            const response = await API.post(`/post/getuserposts`, { uid });
            if (response.data.statusCode == 200) dispatch(SetProfilePosts(response.data.data))
        } catch (err) {
            return null;
        }
        finally {
            setLoading(false);
        }
    };


    const DeletePost = async ({ image_public_id, postid }) => {
        setLoading(true);
        const reqbody = {
            image_public_id,
            postid
        }
        try {
            const result = await API.delete(`/post/deleteuserpost`, { data: reqbody })
            if (result?.data?.statusCode == 200) {
                const reduxdata = result.data.data
                dispatch(DeleteHomePost(reduxdata))
                dispatch(DeleteProfilePost(reduxdata))
                return result.data.data
            }
        }
        catch (error) {
            return error
        }
        finally {
            setLoading(false)
        }

    }


    const UploadUserImage = async (payload) => {
        try {
            setLoading(true)
            const result = await API.post(`/user/uploadImage`, payload)
            if (result?.data?.statusCode == 200 && result?.data?.data?.postid) {
                await GetUserByID(result?.data?.data?.userid)
                const responsedata = result?.data?.data
                const postobj = {
                    postid: responsedata?.postid,
                    caption: responsedata?.caption,
                    image: responsedata?.image,
                    post_type: responsedata?.post_type,
                    time: responsedata?.time,
                    userinfo: {
                        uid: responsedata?.uid,
                        first_name: responsedata?.first_name,
                        last_name: responsedata?.last_name,
                        profile_image: responsedata?.profile_image
                    },
                    likes: [],
                    comments: []
                }
                dispatch(AddProfilePost(postobj))
                dispatch(AddPost(postobj))
                return result?.data?.data;
            }
        }
        catch (error) {
            throw error
        }
        finally {
            setLoading(false)
        }

    }

    const GetPostReaction = async (payload) => {
        try {
            const result = await API.post('/post/getpostreactions', payload)
            if (result.data.statusCode == 200) return result.data.data
        }
        catch (error) {
            throw error
        }
    }

    return { UploadPost, GetHomePosts, GetPostReaction, GetProfilePosts, DeletePost, UploadUserImage, loading };
}

export default usePost


