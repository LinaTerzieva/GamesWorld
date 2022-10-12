import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from './StaticRatingStars.module.css';

const StaticRatingStars = ({rating}: {rating: number}): JSX.Element => {
    var stars = [];
    for (var i = 1; i <= 5; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? `${styles.star}` : `${styles.off}`} />);
    }
    return <>{stars}</>;
}

export default StaticRatingStars;