import React from 'react';

import styles from './DropdownMenu.module.css';

import DropdownMenuItem from './dropdownMenuItem/DropdownMenuItem';


function DropdownMenu() {

    const dropDownItems = [
        {
            title: "Store",
            submenu: [
                {
                    title: "Home",
                    nav: "/",
                },
                {
                    title: "All Games",
                    nav: "/catalog",
                }
            ]
        },
        {
            title: "About",
            submenu: [
                {
                    title: "Company",
                    nav: "/",
                }
            ]
        }, {
            title: "Contact us",
            submenu: [
                {
                    title: "Contact us",
                    nav: "/",
                },
                {
                    title: "Help",
                    nav: "/",
                }
            ]
        }
    ]


    return (
        <div className={styles.headerMenu}>

            {dropDownItems.map((item, index) => <DropdownMenuItem key={index} item={item} />)}

        </div>


    );
}

export default DropdownMenu;