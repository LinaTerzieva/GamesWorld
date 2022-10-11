import { useNavigate } from "react-router-dom"

import styles from './Header.module.css';

import DropdownMenu from './dropdownMenu/DropdownMenu';
import UserMenu from './userMenu/UserMenu';


const Header = (): JSX.Element => {

    const navigate = useNavigate();

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.headerLogo} onClick={() => navigate("/")}>
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

