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
                
                {/* <span className="hamburger-menu">
                    <i />
                    <i />
                    <i />
                </span> */}
                {/* <div className="mobile-menu">
                    <div className="mobile-menu__item">
                    <a className="mobile-menu__links" href="">
                        <i className="mobile-menu__icon fa-solid fa-user" />
                        Log in
                    </a>
                    </div>
                    <div className="mobile-menu__item">
                    <a className="mobile-menu__links" href="">
                        <i className="mobile-menu__icon fa-solid fa-cart-shopping" />
                        Cart
                    </a>
                    </div>
                    <div className="mobile-menu__item">
                    <a
                        className="mobile-menu__links"
                        href="http://localhost:3000/search.html"
                    >
                        Store
                    </a>
                    </div>
                    <div className="mobile-menu__item">
                    <a className="mobile-menu__links" href="">
                        About
                    </a>
                    </div>
                    <div className="mobile-menu__item">
                    <a
                        className="mobile-menu__links"
                        href="http://localhost:3000/contact.html"
                    >
                        Contact us
                    </a>
                    </div>
                </div> */}
            </div>

        </header>
    );
}

export default Header;

