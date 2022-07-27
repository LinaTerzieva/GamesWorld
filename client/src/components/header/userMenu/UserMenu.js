import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

import styles from './UserMenu.module.css'

const UserMenu = () => {
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
                <Link to='/login' className={`${styles.userMenuLink} link`}>
                    Log in
                    <FontAwesomeIcon className={styles.userMenuIcon} icon={faUser} />
                </Link>
            </div>
        </div>
    );
}

export default UserMenu;