import styles from './Header.module.css';

import DropdownMenu from './dropdownMenu/DropdownMenu';
import UserMenu from './userMenu/UserMenu';


const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.headerLogo}>
                    <img
                        className={styles.headerLogoImg}
                        src="../logo.png"
                        alt="logo"
                    />
                </div>
                <DropdownMenu />
                <UserMenu />
            </div>

        </header>
    );
}

export default Header;

