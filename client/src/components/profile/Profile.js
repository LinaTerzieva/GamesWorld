
import styles from './Profile.module.css';

import Header from "../header/Header";
import Footer from "../footer/Footer";

const Profile = () => {
    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className={styles.bannerWrapper} style={{ backgroundImage: `url(${'/images/profileBanner.jpg'})` }}>
                    <div className={styles.bannerMessage}>
                        <div className={styles.bannerTitle}>
                            Hello Admin
                        </div>
                        <div className={styles.bannerTitleDescription}>
                            This is your profile page.
                            <br />
                            Here you can see your profile information and your activity.
                        </div>
                    </div>
                </div>
                <div className="large-wrapper app__container">
                    <div className={styles.myInfoWrapper}>
                        <div className={styles.myInfoBox}>
                            <div className={styles.infoBoxHeader}>
                                Account information
                            </div>
                            <div className={styles.infoBoxContent}>
                                <div>
                                    <p className={styles.infoBoxHeadings}>First name</p>
                                    <h6 class="text-muted f-w-400">Test</h6>
                                </div>
                                <div>
                                    <p className={styles.infoBoxHeadings}>Last name</p>
                                    <h6 class="text-muted f-w-400">Test</h6>
                                </div>
                                <div>
                                    <p className={styles.infoBoxHeadings}>Username</p>
                                    <h6 class="text-muted f-w-400">Test</h6>
                                </div>
                            </div>
                        </div>
                        <div className={styles.myInfoBox}>
                            <div className={styles.infoBoxHeader}>
                                Recent activity
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>

    );
}

export default Profile;