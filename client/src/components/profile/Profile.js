import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from './Profile.module.css';

import Header from "../header/Header";
import Footer from "../footer/Footer";

const Profile = () => {

    const generateStars = (rating) => {
        var stars = [];
        for (var i = 1; i <= 5; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? `${styles.star}` : `${styles.off}`} />);
        }
        return stars;
    }

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
                                Recent activities
                            </div>
                            <div className={styles.infoCommentCard}>
                                <div className={styles.comment}>
                                    <div className={styles.commentHeader}>
                                        <p className="text-muted pt-5 pt-sm-3">
                                            {generateStars(4)}
                                        </p>
                                        <button>
                                            View
                                        </button>
                                    </div>
                                    <h5 className="text-primary mt-3">Comment Description</h5>
                                </div>
                            </div>
                            <div className={styles.infoCommentCard}>
                                <div className={styles.comment}>
                                    <div className="ml-auto">
                                        <p className="text-muted pt-5 pt-sm-3">
                                            {generateStars(4)}
                                        </p>
                                    </div>
                                    <h5 className="text-primary mt-3">Comment Description</h5>
                                </div>
                            </div>
                            <div className={styles.infoCommentCard}>
                                <div className={styles.comment}>
                                    <div className="ml-auto">
                                        <p className="text-muted pt-5 pt-sm-3">
                                            {generateStars(4)}
                                        </p>
                                    </div>
                                    <h5 className="text-primary mt-3">Comment Description</h5>
                                </div>
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