import React from 'react'
import styles from "./story.module.css"
import AddIcon from '@mui/icons-material/Add';

const CreateStory = () => {


    const User_Image = "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"

    return (

        <div className={styles.storyUserBoxContainer}>
            <img src={User_Image} alt='user' className={styles.UserprofileImage} />
            <div className={styles.AddIconDiv}  >
                <AddIcon className={styles.AddIcon} />
            </div>
            <span className={styles.CreateStoryText} >Create Story</span>
        </div>
    )
}

export default CreateStory