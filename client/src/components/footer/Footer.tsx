import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { SocialItems } from "../../lib/types";
import  styles  from "./Footer.module.css";

import SocialMenu from "./socialMenu/SocialMenu";

const Footer = () => {

    const socialItems: SocialItems = [
        {
            icon: faFacebookSquare
        },
        {
            icon: faInstagramSquare
        },
        {
            icon: faTwitterSquare
        },
    ]
    

    return (
        <footer>
            <div className={styles.footerWrapper}>

                <SocialMenu socialItems={socialItems}/>

                <div className={styles.footerCopyright}>
                    <span>©2022 GamesWorld, INC. ALL RIGHTS RESERVED.</span>
                    <br />
                    <span>
                        All trademarks and registered trademarks are the property of their
                        respective owners.
                    </span>
                </div>
                <div className={styles.footerLegal}>
                    <a className={styles.footerLegalLink} href="">
                        Privacy
                    </a>
                    <a className={styles.footerLegalLink} href="">
                        Legal
                    </a>
                    <a className={styles.footerLegalLink} href="">
                        Terms
                    </a>
                    <a className={styles.footerLegalLink} href="">
                        Cookie policy
                    </a>
                    <a className={styles.footerLegalLink} href="">
                        Cookie settings
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;