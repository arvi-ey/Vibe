
import ErrorIMg from "../../assets/error.svg"
import styles from "./error.module.css"
import { useNavigate } from "react-router"

const Error = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.ErrorContainer} >
            <img src={ErrorIMg} alt='ERROR' className={styles.errorImg} />
            <div className={styles.homereturnButton} onClick={() => navigate("/")} >
                Return to home page
            </div>
        </div>
    )
}

export default Error