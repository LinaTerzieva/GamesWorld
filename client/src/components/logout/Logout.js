import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket  } from "@fortawesome/free-solid-svg-icons";

import styles from './LogOut.module.css';


const LogOut = () => {
    return (
        <div className={styles.userMenuItem}>
            <Link to='/login' className={`${styles.userMenuLink} link`} href="">
                Log out
                <FontAwesomeIcon className={styles.userMenuIcon} icon={faArrowRightFromBracket} />
            </Link>
        </div>
    );
}

export default LogOut;