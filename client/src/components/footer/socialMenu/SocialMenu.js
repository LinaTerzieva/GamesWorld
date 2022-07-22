import styles from './SocialMenu.module.css';

import SocialMenuItem from "../socialMenuItem/SocialMenuItem";

const SocialMenu = ({socialItems}) => {
    
    return (
        <div className={styles.footerSocial}>
            {socialItems.map((socialItem, index) => <SocialMenuItem key={index} socialItem={socialItem} />)}
        </div>
    );
}

export default SocialMenu;