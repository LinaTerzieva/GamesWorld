import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthenticationContext from "../../lib/AuthenticationContext";
import useUserApi from "../../lib/useUserApi";
import useCommentApi from "../../lib/useCommentApi";

import styles from './ProfilePage.module.css';

import StaticRatingStars from '../../components/staticRatingStars/StaticRatingStars';
import { AuthContextType, UserGameComments } from "../../lib/types";

type UserState = {
    username?: string,
    firstName?: string,
    lastName?: string
}

const ProfilePage = () => {

    let navigate = useNavigate();

    const { auth } = useContext(AuthenticationContext) as AuthContextType;
    const { getUserInfo } = useUserApi();
    const { getUserComments } = useCommentApi();
    const [user, setUser] = useState<UserState>({});
    const [recentComments, setRecentComments] = useState<UserGameComments>([]);

    const numberOfCommentsToShow = 3;

    useEffect(() => {
        getUserInfo()
            .then(data => setUser(data));

        getUserComments(auth.id, numberOfCommentsToShow)
            .then(data => setRecentComments(data));

    }, [auth.accessToken, auth.id]);

    const handleClick = (gameId: string) => {
        navigate(`/detail/${gameId}`, { replace: false });
    }


    return (
        <>
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
                            {recentComments.length
                                ? recentComments.map((comment) => {
                                    return (
                                        <div key={comment._id} className={styles.infoCommentCard}>
                                            <div className={styles.comment}>
                                                <div className={styles.commentHeader}>
                                                    <p className="text-muted pt-5 pt-sm-3">
                                                        <StaticRatingStars rating={comment.rating} />
                                                    </p>
                                                    <button className={styles.commentViewBtn} onClick={() => handleClick(comment._gameId)}>
                                                        View
                                                    </button>
                                                </div>
                                                <h5 className="text-primary mt-3">{comment.description}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className={styles.noActivityMessage}>
                                    No recent activities.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProfilePage;