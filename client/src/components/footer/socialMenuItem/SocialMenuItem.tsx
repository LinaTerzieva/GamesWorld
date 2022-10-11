import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialItem } from "../../../lib/types";

import styles from './SocialMenuItem.module.css';

const SocialMenuItem = ({socialItem}: {socialItem: SocialItem}) => {
    
    return (
        <a className={styles.footerSocialLink} href="">
            <FontAwesomeIcon className={styles.footerSocialIcon} icon={socialItem.icon} />
        </a>
    );
}

export default SocialMenuItem;