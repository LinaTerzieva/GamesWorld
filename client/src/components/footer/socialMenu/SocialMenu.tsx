import styles from './SocialMenu.module.css';

import SocialMenuItem from "../socialMenuItem/SocialMenuItem";
import { SocialItems } from '../../../lib/types';

const SocialMenu = ({socialItems}: {socialItems: SocialItems}): JSX.Element => {
    
    return (
        <div className={styles.footerSocial}>
            {socialItems.map((socialItem, index) => <SocialMenuItem key={index} socialItem={socialItem} />)}
        </div>
    );
}

export default SocialMenu;