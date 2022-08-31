import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player/youtube";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare, faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from './DetailPage.module.css';

import AuthenticationContext from '../../lib/AuthenticationContext';
import useCommentApi from '../../lib/useCommentApi';

import useGameApi from '../../lib/useGameApi';

import StaticRatingStars from '../../components/staticRatingStars/StaticRatingStars';

const DetailPage = () => {

    const { auth } = useContext(AuthenticationContext);
    const { getComments, createComment, editComment, deleteComment } = useCommentApi();
    const { getGame } = useGameApi();

    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [allComments, setAllComments] = useState([]);
    const [newComment, setNewComment] = useState({
        _gameId: gameId,
        description: "",
        rating: 0
    });

    const [hover, setHover] = useState(0);
    const [editHover, setEditHover] = useState(0);

    const price = parseFloat(game.price).toFixed(2);
    const [createValidation, setCreateValidation] = useState({});
    const [editValidation, setEditValidation] = useState({});

    const [editModal, setEditModal] = useState({
        isOpen: false,
        comment: {}
    });

    const handleClose = () => setEditModal({
        isOpen: false,
        comment: {}
    });

    function openFromParent(comment) {
        setEditModal({
            isOpen: true,
            comment: comment
        });

        setEditHover(0);

    }

    const handleEditChange = (e) => {
        const value = e.target.value;
        setEditModal({
            ...editModal,
            comment: {
                ...editModal.comment,

                [e.target.name]: value
            }
        });
    }


    useEffect(() => {
        getGame(gameId)
            .then(data => setGame(data));


        getComments(gameId)
            .then(data => setAllComments(data));
    }, []);

    const handleChange = (e) => {
        const newCommentText = e.target.value;
        setNewComment({
            ...newComment,
            description: newCommentText
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setCreateValidation({});

        if (newComment.description == "") {
            return setCreateValidation({ description: "Please enter a comment" });
        }

        createComment(newComment)
            .then((response) => {
                if (response.status == 200) {
                    getComments(gameId)
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


    const submitEditHandler = (e) => {
        e.preventDefault();
        setEditValidation({});

        if (editModal.comment.description == "") {
            return setEditValidation({ description: "Please enter a comment" });
        }

        editComment(editModal.comment)
            .then((response) => {
                if (response.status == 200) {
                    getComments(gameId)
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })

        setEditModal({
            isOpen: false,
            comment: {}
        })
    }

    const handleDelete = (commentId) => {
        deleteComment(commentId)
            .then((response) => {
                if (response.status == 200) {
                    getComments(gameId)
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })
    }

    return (
        <>
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
                            <button className={styles.gameAddToCartBtn}>
                                Add to cart
                                <FontAwesomeIcon icon={faCartShopping} className={styles.gameAddToCartIcon} />
                            </button>
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
                            {createValidation.description &&
                                <div className={styles.inputCommentValMsg}>{createValidation.description}</div>
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
                            {allComments.length
                                ? allComments.map((comment) => {
                                    return (
                                        <div className={styles.commentCard} key={comment._id}>
                                            <div className={styles.commentCardContent}>
                                                <div className="row d-flex">
                                                    <div className="d-flex flex-column">
                                                        <h3 className={`${styles.commentCardAuthor} mt-2 mb-0`}>{comment.author.username}</h3>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <p className="text-muted pt-5 pt-sm-3">
                                                            <StaticRatingStars rating={comment.rating} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`${styles.commentCardDescription} row text-left`}>
                                                    <h4 className="text-primary mt-3">{comment.description}</h4>
                                                </div>
                                            </div>

                                            {comment._ownerId == auth.id &&
                                                <div className={styles.commentCardActions}>
                                                    <button onClick={() => openFromParent(comment)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className={styles.cardActionIcon} />
                                                    </button>
                                                    <button onClick={() => handleDelete(comment._id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} className={styles.cardActionIcon} />
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                                : <div className={styles.noCommentsMessage}>
                                    No comments
                                </div>
                            }

                            <Modal show={editModal.isOpen} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit your comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={(e) => submitEditHandler(e)}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <div className={styles.ratingStars}>
                                                {[...Array(5)].map((star, index) => {
                                                    index += 1;

                                                    return (
                                                        <button
                                                            type="button"
                                                            key={index}
                                                            className={index <= (editHover || editModal.comment.rating) ? `${styles.star}` : `${styles.off}`}
                                                            onClick={() => setEditModal((state) => {
                                                                return ({
                                                                    ...state,
                                                                    comment: {
                                                                        ...editModal.comment,
                                                                        rating: index
                                                                    }
                                                                })
                                                            })}
                                                            onMouseEnter={() => setEditHover(index)}
                                                            onMouseLeave={() => setEditHover(editModal.comment.rating)}
                                                        >
                                                            <FontAwesomeIcon icon={faStar} className={styles.ratingStar} />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Control as="textarea" rows={3} value={editModal.comment.description} onChange={handleEditChange} name="description" />
                                        </Form.Group>
                                        {editValidation.description &&
                                            <div className={styles.inputCommentValMsg}>{editValidation.description}</div>
                                        }
                                        <input type="submit" value="Submit" />
                                    </Form>
                                </Modal.Body>
                            </Modal>

                        </div>

                    </div>

                </div>
            </div>
        </>

    );
}

export default DetailPage;