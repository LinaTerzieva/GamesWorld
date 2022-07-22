import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './SocialMenuItem.module.css';

const SocialMenuItem = ({socialItem}) => {
    
    return (
        <a className={styles.footerSocialLink} href="">
            <FontAwesomeIcon className={styles.footerSocialIcon} icon={socialItem.icon} />
        </a>
    );
}

export default SocialMenuItem;