import Map from "../../components/maps/Map";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import styles from './ContactPage.module.css';


const ContactPage = (): JSX.Element => {


    return (
        <>
            <div className="main-wrapper">
                <div className="wrapper">
                    <div className={styles.contactHeader}>
                        <div className={styles.contactTitle}>Contact Us</div>
                        <div className={styles.contactDescription}>
                            Any questions or remarks? Just write us a message or e-mail us at{" "}
                            <a
                                href="mailto:gamesworld@gmail.com"
                                className="contact-form__description-link"
                            >
                                gamesworld@gmail.com
                            </a>
                            <br />
                            and we will get back to you promptly regarding your request.
                        </div>
                    </div>
                    <div className={styles.contactWrapper}>
                        <div>
                            <Map />
                        </div>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactInfoItem}>
                                <a
                                    className={`${styles.contactInfoLink} link`}
                                    href="mailto:gamesworld@gmail.com"
                                >
                                    <div className={styles.contactInfoCircle}>
                                        <FontAwesomeIcon icon={faEnvelope} className={styles.contactImg} />
                                    </div>
                                    <div className={styles.contactInfoText}>gamesworld@gmail.com</div>
                                </a>
                            </div>
                            <div className={styles.contactInfoItem}>
                                <a
                                    className={`${styles.contactInfoLink} link`}
                                    href="tel:359-555-754-777"
                                >
                                    <div className={styles.contactInfoCircle}>
                                        <FontAwesomeIcon icon={faPhone} className={styles.contactImg} />
                                    </div>
                                    <div className={styles.contactInfoText}>+359 555 754 777</div>
                                </a>
                            </div>
                            <div className={styles.contactInfoItem}>
                                <div className={styles.contactInfoCircle}>
                                    <FontAwesomeIcon icon={faLocationDot} className={styles.contactImg} />
                                </div>
                                <div className={styles.contactInfoText}>
                                    bul.Bulgaria 100, 1330 Sofia, Bulgaria
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ContactPage;