import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player/youtube";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from './Detail.module.css';

import AuthenticationContext from '../../lib/AuthenticationContext';

import Header from '../header/Header';
import Footer from '../footer/Footer';

const Detail = () => {

    const { auth } = useContext(AuthenticationContext);

    let { gameId } = useParams();
    const [game, setGame] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [newComment, setNewComment] = useState({
        _gameId: gameId,
        description: "",
        rating: 0
    });
    const [hover, setHover] = useState(0);

    const price = parseFloat(game.price).toFixed(2);
    const [validationMessage, setValidationMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3030/data/games/${gameId}`)
            .then(response => response.json())
            .then(data => setGame(data));


        fetch(`http://localhost:3030/data/comments?where=_gameId%3D%22${gameId}%22&load=author%3D_ownerId%3Ausers`)
            .then(response => response.json())
            .then(data => setAllComments(data));
    }, []);

    const generateStars = (rating) => {
        var stars = [];
        for (var i = 1; i <= 5; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? `${styles.star}` : `${styles.off}`} />);
        }
        return stars;
    }

    const handleChange = (e) => {
        const newCommentText = e.target.value;
        setNewComment({
            ...newComment,
            description: newCommentText
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (newComment.description == "") {
            return setValidationMessage("Please enter a comment");
        }

        fetch('http://localhost:3030/data/comments', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authorization': `${auth.accessToken}`
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (response.status == 200) {
                    fetch(`http://localhost:3030/data/comments?where=_gameId%3D%22${gameId}%22&load=author%3D_ownerId%3Ausers`)
                        .then(response => response.json())
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })

        setNewComment({
            _gameId: gameId,
            description: "",
            rating: 0
        });

        setHover(0);

    }

    return (
        <>
            <Header />
            <div className="main-wrapper">
                <div className="large-wrapper app__container">
                    <div className={styles.detailHeader}>
                        <div className={styles.detailTitle}>Overview</div>
                    </div>
                    <div className={styles.gameTitle}>{game.title}</div>
                    <div className={styles.gameContainer}>
                        <div className={styles.gameBoxLeft}>
                            <div className={styles.gameTrailerBox}>
                                <ReactPlayer
                                    url={game.trailer}
                                />
                            </div>

                            <div className={styles.gameDescriptionBox}>
                                <div className={styles.gameDetails}>
                                    <div className={styles.gameDetailsItem}>
                                        <div className={styles.detailsCategory}>Genres</div>
                                        <div className={styles.detailsContent}>
                                            {game && game.genres && game.genres.map((genre, i) => {
                                                return (
                                                    <span key={i} className={styles.detailsContentItem}>
                                                        {genre}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <br />
                                {game.description}
                            </div>
                        </div>
                        <aside className={styles.gameBoxRight}>
                            <img className={styles.gameImage} src={`/images/games/${game.cover}`} />
                            <div className={styles.gamePrice}>{price}€</div>
                        </aside>
                    </div>

                    {auth.accessToken &&
                        <form onSubmit={submitHandler} className={styles.commentSectionWrapper}>
                            <label htmlFor="comment" className={styles.commentSectionTitle}>Add a comment</label>
                            <div className={styles.ratingStars}>
                                {[...Array(5)].map((star, index) => {
                                    index += 1;

                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || newComment.rating) ? `${styles.star}` : `${styles.off}`}
                                            onClick={() => setNewComment((state) => {
                                                return ({
                                                    ...state,
                                                    rating: index
                                                })
                                            })}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(newComment.rating)}
                                        >
                                            <FontAwesomeIcon icon={faStar} className={styles.ratingStar} />
                                        </button>
                                    );
                                })}
                            </div>

                            <div>
                                <textarea type="text" id="comment" className={styles.inputComment} value={newComment.description}
                                    onChange={handleChange} rows="5" cols="50" />
                            </div>
                            {validationMessage != "" &&
                                <div>{validationMessage}</div>
                            }
                            <button type="submit" className={styles.submitComment}>
                                Submit
                            </button>
                        </form>
                    }
                    <div className={styles.commentSectionWrapper}>

                        <div className={styles.allCommentsSection}>
                            <div className={styles.allCommentsTitle}>
                                All Comments
                            </div>
                            {allComments && allComments.map((comment) => {
                                return (<div className={styles.commentCard} key={comment._id}>
                                    <div className="row d-flex">

                                        <div className="d-flex flex-column">
                                            <h3 className={`${styles.commentCardAuthor} mt-2 mb-0`}>{comment.author.username}</h3>

                                        </div>
                                        <div className="ml-auto">
                                            <p className="text-muted pt-5 pt-sm-3">
                                                {generateStars(comment.rating)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row text-left">
                                        <h4 className="text-primary mt-3">{comment.description}</h4>
                                    </div>

                                </div>)
                            })}


                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>

    );
}

export default Detail;