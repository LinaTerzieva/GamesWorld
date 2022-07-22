import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import styles from './DropdownMenuItem.module.css';

function DropdownMenuItem({ item }) {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.headerMenuItem}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <a className={`${styles.headerMenuLink} link`}>
                {item.title}
            </a>

            <Dropdown.Menu show={open} className={styles.headerDropdownContent}>
                {item.submenu.map((subMenuItem,index) => (
                        <Dropdown.Item key={index} href="#/action-1">{subMenuItem.title}</Dropdown.Item>
                ))}
            </Dropdown.Menu>

        </div>
    );
}

export default DropdownMenuItem;