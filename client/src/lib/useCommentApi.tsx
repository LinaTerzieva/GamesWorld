import { GameComment, GameComments, NewComment, UpdatedComment, UserGameComment, UserGameComments } from "./types";
import useHeaders from "./useHeaders";

const useCommentApi = () => {

    const { getHeaders } = useHeaders();

    const getUserComments = (id: string, numberOfCommentsToShow: number): Promise<UserGameComments>=> {
        return fetch(`http://localhost:3030/data/comments?where=_ownerId%3D%22${id}%22&pageSize=${numberOfCommentsToShow}`)
            .then(response => response.json())
    }

    const getComments = (gameId: string): Promise<GameComments> => {
        return fetch(`http://localhost:3030/data/comments?where=_gameId%3D%22${gameId}%22&load=author%3D_ownerId%3Ausers`)
            .then(response => response.json())
    }

    const createComment = (newComment: NewComment): Promise<UserGameComment> => {
        
        return fetch('http://localhost:3030/data/comments', {
            method: 'POST',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newComment),
        }).then(response => response.json())
    }

    const editComment = (comment: GameComment): Promise<UpdatedComment> => {
        return fetch(`http://localhost:3030/data/comments/${comment._id}`, {
            method: 'PUT',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                _gameId: comment._gameId,
                description: comment.description,
                rating: comment.rating
            }),
        }).then(response => response.json())
    }

    const deleteComment = (commentId: string): Promise<Response> => {
        return fetch(`http://localhost:3030/data/comments/${commentId}`, {
            method: 'DELETE',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            })
        })
    }

    return { getUserComments, getComments, createComment, editComment, deleteComment };
}

export default useCommentApi;