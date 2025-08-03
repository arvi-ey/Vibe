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
            const user = state.homeStories.find(data => data.uid == uploader)

            if (user) {
                user.stories.push({ image, time, uploader, caption })
            }
            else {
                const newstoryObj = {
                    uid: uploader,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    profile_image: action.payload.profile_image,
                    stories: [{ image, caption, time }]
                }
                state.homeStories = [newstoryObj, ...state.homeStories]
            }

        },
        GetUserStories: (state, action) => {
            state.UserStories = action.payload
        }
    }

})


// {
//     "message": "Successful",
// "data": [
//     {
//         "uid": "1056e0b3-cea6-4bfa-8ab8-b8e1bb3c235e",
//         "first_name": "Tuhin",
//         "last_name": "Roy",
//         "profile_image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1752898147/yxefteigbc5mj6zolosm.jpg",
//         "stories": [
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754063910/fhdayqktpbg8ht9c3lmk.jpg",
//                 "caption": "",
//                 "time": "1754063906781"
//             },
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754064229/ittcj7fklmtrxampabri.jpg",
//                 "caption": "",
//                 "time": "1754064226220"
//             },
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754113830/rov97yshrgdb1k1dljpw.jpg",
//                 "caption": "",
//                 "time": "1754113825911"
//             },
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754113883/juqovwvljrvfylxykshj.jpg",
//                 "caption": "",
//                 "time": "1754113879005"
//             },
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754113941/euo6wab8t1jmvzgvuqkk.jpg",
//                 "caption": "",
//                 "time": "1754113937029"
//             },
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754115241/rdejlfxgsq5zzglg5j56.jpg",
//                 "caption": "",
//                 "time": "1754115237203"
//             }
//         ]
//     },
//     {
//         "uid": "2e4ca11c-5d92-4eb0-b340-b41dd2a43218",
//         "first_name": "Vikrant",
//         "last_name": "Dubey",
//         "profile_image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1753167393/pjinuf3ysb1fzdtkurqz.jpg",
//         "stories": [
//             {
//                 "image": "https://res.cloudinary.com/dnpbnppjt/image/upload/v1754113285/kzkx4vrxnpwet1znagvp.jpg",
//                 "caption": "",
//                 "time": "1754113280519"
//             }
//         ]
//     }
// ],
//             "statusCode": 200
// }

export const { GetAllHomeStories, AddUserStory } = storySlicer.actions
export default storySlicer.reducer