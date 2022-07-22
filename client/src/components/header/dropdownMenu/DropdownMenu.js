import React from 'react';

import styles from './DropdownMenu.module.css';

import DropdownMenuItem from '../dropdownMenuItem/DropdownMenuItem';


function DropdownMenu() {

    const dropDownItems = [
        {
            title: "Store",
            submenu: [
                {
                    title: "Home",
                },
                {
                    title: "All Games",
                }
            ]
        },
        {
            title: "About",
            submenu: [
                {
                    title: "Company",
                }
            ]
        }, {
            title: "Contact us",
            submenu: [
                {
                    title: "Contacts us",
                },
                {
                    title: "Help",
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