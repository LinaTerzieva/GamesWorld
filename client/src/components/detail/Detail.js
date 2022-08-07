import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player/youtube";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? "star" : "off"} />);
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
                    <div className="app-header">
                        <div className="detail-title">Overview</div>
                    </div>
                    <div className="game__title heading-medium">{game.title}</div>
                    <div className="game__box">
                        <div className="swiper-container">
                            <div className="swiper mySwiper">
                                <div>
                                    <ReactPlayer
                                        url={game.trailer}
                                    />
                                </div>


                            </div>

                            <div className="game__description">
                                {/* <div className="game__description-title">
                                    WELCOME TO THE PACIFIC — EVERYTHING YOU NEED TO KNOW ABOUT CALL OF
                                    DUTY®: VANGUARD SEASON ONE
                                </div> */}
                                <div className="game__details">
                                    <div className="game__details-item">
                                        <div className="details__category">Genres</div>
                                        <div className="details__content">
                                            {game && game.genres && game.genres.map((genre, i) => {
                                                return (
                                                    <span key={i} className="details__content-link">
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
                        <aside className="game-buy-box">
                            <img className="game__image" src={`/images/games/${game.cover}`} />
                            <div className="game__price">{price}€</div>
                        </aside>
                    </div>

                    <div className="ratingWrapper">
                        <form onSubmit={submitHandler}>
                            <label htmlFor="comment">Add a comment</label>
                            <div className="ratingStars">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || newComment.rating) ? "star" : "off"}
                                            onClick={() => setNewComment((state) => {
                                                return ({
                                                    ...state,
                                                    rating: index
                                                })
                                            })}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(newComment.rating)}
                                        >
                                            <FontAwesomeIcon icon={faStar} className="ratingStar" />
                                        </button>
                                    );
                                })}
                            </div>

                            <div>
                                <textarea type="text" id="comment" className="input-rating" value={newComment.description}
                                    onChange={handleChange} />
                            </div>
                            {validationMessage != "" &&
                                <div>{validationMessage}</div>
                            }

                            <button type="submit" className="submit-rating">
                                Submit
                            </button>
                        </form>
                        <div>
                            <div>
                                All Comments
                            </div>
                            {allComments && allComments.map((comment) => {
                                return (<div className="card" key={comment._id}>
                                    <div className="row d-flex">

                                        <div className="d-flex flex-column">
                                            <h3 className="mt-2 mb-0">{comment.author.username}</h3>

                                        </div>
                                        <div className="ml-auto">
                                            <p className="text-muted pt-5 pt-sm-3">
                                                {generateStars(comment.rating)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row text-left">
                                        <h4 className="blue-text mt-3">{comment.description}</h4>
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