import AuthenticationContext from './../../../lib/AuthenticationContext'
import { useContext } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from './UserMenu.module.css';


const UserMenu = () => {

    const { auth, logoutUser } = useContext(AuthenticationContext);

    const handleProfile = () => {
        fetch('http://localhost:3030/users/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': `${auth.accessToken}`
            },
        })
            .then((response) => {console.log(response)});
    }

    const logOutHandler = () => {
        logoutUser();
    }

    return (
        <div className={styles.headerUserMenu}>
            <div className={styles.userMenuItem}>
                {!auth.accessToken
                    ? <Link to='/login' className={`${styles.userMenuLink} link`}>
                        Log in
                        <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                    </Link>
                    : <>
                        <Link to='/profile' className={`${styles.userMenuLink} link`} onClick={handleProfile}>
                            My profile
                            <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                        </Link>
                        <Link to='/' className={`${styles.userMenuLink} link`} onClick={logOutHandler}>
                            Log out
                            <FontAwesomeIcon className={styles.userMenuIcon} icon={faArrowRightFromBracket} />
                        </Link>
                    </>

                }
            </div>
        </div>
    );
}

export default UserMenu;