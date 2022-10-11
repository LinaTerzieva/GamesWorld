import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DropDownItem } from '../../../../lib/types';

import styles from './DropdownMenuItem.module.css';

function DropdownMenuItem({ item }: {item : DropDownItem}) {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.headerMenuItem}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span className={`${styles.headerMenuLink} link`}>
                {item.title}
            </span>

            <Dropdown.Menu show={open} className={styles.headerDropdownContent}>
                {item.submenu.map((subMenuItem,index) => (
                        <Dropdown.Item key={index} as={Link} to={subMenuItem.nav}>{subMenuItem.title}</Dropdown.Item>
                ))}
            </Dropdown.Menu>

        </div>
    );
}

export default DropdownMenuItem;