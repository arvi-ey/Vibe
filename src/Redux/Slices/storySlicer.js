import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeStories: [],
    UserStories: []
}


const storySlicer = createSlice({
    name: 'story',
    initialState,
    reducers: {
        GetAllHomeStories: (state, action) => {
            state.homeStories = action.payload
        },
        AddUserStory: (state, action) => {
            const { image, time, caption, uploader } = action.payload
            if (state.UserStories.length > 0) {
                state.UserStories[0].stories.push({ image, caption, time })
            }
            else {
                const newstoryObj = {
                    uid: uploader,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    profile_image: action.payload.profile_image,
                    stories: [{ image, caption, time }]
                }
                state.UserStories = [newstoryObj, ...state.UserStories]
            }


        },
        GetUserStories: (state, action) => {
            state.UserStories = action.payload
        }
    }

})



export const { GetAllHomeStories, AddUserStory, GetUserStories } = storySlicer.actions
export default storySlicer.reducer