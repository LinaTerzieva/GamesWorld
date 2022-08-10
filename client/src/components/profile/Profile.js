import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticationContext from "../../lib/AuthenticationContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from './Profile.module.css';

import Header from "../header/Header";
import Footer from "../footer/Footer";

const Profile = () => {

    let navigate = useNavigate();

    const { auth } = useContext(AuthenticationContext);
    const [user, setUser] = useState({});
    const [recentComments, setRecentComments] = useState([]);

    const numberOfCommentsToShow = 3;

    useEffect(() => {
        fetch('http://localhost:3030/users/me', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': `${auth.accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => setUser(data));

        fetch(`http://localhost:3030/data/comments?where=_ownerId%3D%22${auth.id}%22&pageSize=${numberOfCommentsToShow}`)
            .then(response => response.json())
            .then(data => setRecentComments(data));

    }, [auth.accessToken, auth.id]);

    const handleClick = (gameId) => {
        navigate(`/detail/${gameId}`, { replace: false });
    }

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
                            Hello {user.username}
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
                                    <h6 className="text-muted f-w-400">{user.firstName}</h6>
                                </div>
                                <div>
                                    <p className={styles.infoBoxHeadings}>Last name</p>
                                    <h6 className="text-muted f-w-400">{user.lastName}</h6>
                                </div>
                                <div>
                                    <p className={styles.infoBoxHeadings}>Username</p>
                                    <h6 className="text-muted f-w-400">{user.username}</h6>
                                </div>
                            </div>
                        </div>
                        <div className={styles.myInfoBox}>
                            <div className={styles.infoBoxHeader}>
                                Recent activities
                            </div>
                            {recentComments && recentComments.map((comment) => {
                                console.log(comment);
                                return (
                                    <div key={comment._id} className={styles.infoCommentCard}>
                                        <div className={styles.comment}>
                                            <div className={styles.commentHeader}>
                                                <p className="text-muted pt-5 pt-sm-3">
                                                    {generateStars(comment.rating)}
                                                </p>
                                                <button className={styles.commentViewBtn} onClick={() => handleClick(comment._gameId)}>
                                                    View
                                                </button>
                                            </div>
                                            <h5 className="text-primary mt-3">{comment.description}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>

    );
}

export default Profile;