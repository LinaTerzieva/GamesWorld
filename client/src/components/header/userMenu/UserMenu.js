import AuthenticationContext from './../../../lib/AuthenticationContext'
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import Cart from '../../cart/Cart';

import styles from './UserMenu.module.css';


const UserMenu = () => {

    const { auth, logoutUser } = useContext(AuthenticationContext);
    const [showCart, setShowCart] = useState(false);

    const handleProfile = () => {
        fetch('http://localhost:3030/users/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': `${auth.accessToken}`
            },
        })
            .then((response) => { console.log(response) });
    }

    const logOutHandler = () => {
        logoutUser();
    }

    const showShoppingCart = () => {
        setShowCart(current => !current);
    }

    const hideShoppingCart = () => {
        setShowCart(false);
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
                        <div className={`${styles.userMenuLink} link`} onClick={showShoppingCart} onMouseLeave={hideShoppingCart}>
                            Cart
                            <FontAwesomeIcon className={styles.userMenuIcon} icon={faCartShopping} />
                            <div className={styles.cartWrapper}>
                                {showCart && <Cart />}
                            </div>
                        </div>
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