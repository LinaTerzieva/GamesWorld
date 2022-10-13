import { ADD_TO_CART_INCREASE } from "../../lib/Constants";
import { useEffect, useState, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from "react-player/youtube";

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare, faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from './DetailPage.module.css';

import AuthenticationContext from '../../lib/AuthenticationContext';
import CartContext from '../../lib/CartContext';
import useCommentApi from '../../lib/useCommentApi';

import useGameApi from '../../lib/useGameApi';

import StaticRatingStars from '../../components/staticRatingStars/StaticRatingStars';
import { ApiError, AuthContextType, CartContextType, EditModalState, GameComment, GameComments, NewComment, Product, ShortValidation } from "../../lib/types";

const DetailPage = () => {

    const navigate = useNavigate();
    const { auth } = useContext(AuthenticationContext) as AuthContextType;
    const { updateCart } = useContext(CartContext) as CartContextType;
    const { getComments, createComment, editComment, deleteComment } = useCommentApi();
    const { getGame } = useGameApi();

    const { gameId } = useParams<string>();
    const id = gameId == undefined ? "" : gameId;

    const [game, setGame] = useState<Product>({
        _id: "",
        title: "",
        description: "",
        cover: "",
        trailer: "",
        discount: 0,
        price: 0,
        genres: [],
    });
    const [allComments, setAllComments] = useState<GameComments>([]);
    const [newComment, setNewComment] = useState<NewComment>({
        _gameId: id,
        description: "",
        rating: 0
    });

    const [hover, setHover] = useState(0);
    const [editHover, setEditHover] = useState(0);

    const price: string = game.price.toFixed(2);
    const [createValidation, setCreateValidation] = useState<ShortValidation>({ description: "" });
    const [editValidation, setEditValidation] = useState<ShortValidation>({ description: "" });

    const [editModal, setEditModal] = useState<EditModalState>({
        isOpen: false,
        comment: {
            author: {
                username: "",
                firstName: "",
                lastName: "",
                _id: "",
            },
            _ownerId: "",
            _gameId: "",
            description: "",
            rating: 0,
            _id: "",
        }
    });

    useEffect(() => {

        getGame(id)
            .then(data => {
                setGame(data);
            })
            .catch((error: Promise<ApiError>) => {
                navigate('/');
            });


        getComments(id)
            .then(data => setAllComments(data));
    }, []);

    const handleClose = () => setEditModal({
        isOpen: false,
        comment: {
            author: {
                username: "",
                firstName: "",
                lastName: "",
                _id: "",
            },
            _ownerId: "",
            _gameId: "",
            description: "",
            rating: 0,
            _id: "",
        }
    });

    function openFromParent(comment: GameComment): void {
        setEditModal({
            isOpen: true,
            comment: comment
        });

        setEditHover(0);

    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditModal({
            ...editModal,
            comment: {
                ...editModal.comment,

                [e.target.name]: value
            }
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCommentText = e.target.value;
        setNewComment({
            ...newComment,
            description: newCommentText
        });
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreateValidation({});

        if (newComment.description == "") {
            return setCreateValidation({ description: "Please enter a comment" });
        }

        createComment(newComment)
            .then((response) => {
                if (response.status == 200) {
                    getComments(id)
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })

        setNewComment({
            _gameId: id,
            description: "",
            rating: 0
        });

        setHover(0);

    }


    const submitEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditValidation({});

        if (editModal.comment.description == "") {
            return setEditValidation({ description: "Please enter a comment" });
        }

        editComment(editModal.comment)
            .then((response) => {
                if (response.status == 200) {
                    getComments(id)
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })

        setEditModal({
            isOpen: false,
            comment: {
                author: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    _id: "",
                },
                _ownerId: "",
                _gameId: "",
                description: "",
                rating: 0,
                _id: "",
            }
        })
    }

    const handleDelete = (commentId: string) => {
        deleteComment(commentId)
            .then((response) => {
                if (response.status == 200) {
                    getComments(id)
                        .then(data => {
                            setAllComments(data);
                        });
                }
                //403 forbidden error
            })
    }

    const addGameToCart = () => {
        updateCart(id, ADD_TO_CART_INCREASE);
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
                            <button className={styles.gameAddToCartBtn} onClick={addGameToCart}>
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
                                <textarea id="comment" className={styles.inputComment} value={newComment.description}
                                    onChange={handleChange} rows={5} cols={50} />
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