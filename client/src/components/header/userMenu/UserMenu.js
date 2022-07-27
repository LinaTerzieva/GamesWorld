import AuthenticationContext from './../../../lib/AuthenticationContext'
import { useContext } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from './UserMenu.module.css';


const UserMenu = () => {

    const { auth, loginUser, logoutUser } = useContext(AuthenticationContext);

    const logOutHandler = () => {
        
        logoutUser();
    }

    return (
        <div className={styles.headerUserMenu}>
            <div className={`${styles.userMenuItem} ${styles.userMenuItemCart}`}>
                <label className={styles.userMenuItemCartLabel}>
                    <a className={`${styles.userMenuLink} link`}>
                        Cart
                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faCartShopping} />
                    </a>
                </label>
                <span className={`${styles.userMenuItemCartCount} position-absolute top-0 translate-middle badge rounded-pill`}>
                    0
                </span>
            </div>
            <div className={styles.userMenuItem}>
                {!auth.accessToken
                    ? <Link to='/login' className={`${styles.userMenuLink} link`}>
                        Log in
                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                    </Link>
                    : <Link to='/' className={`${styles.userMenuLink} link`} onClick={logOutHandler}>
                        Log out
                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faArrowRightFromBracket} />
                    </Link>
                }
            </div>
        </div>
    );
}

export default UserMenu;