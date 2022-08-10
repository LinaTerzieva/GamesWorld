import useHeaders from "./useHeaders";

const useCommentApi = () => {

    const { getHeaders } = useHeaders();

    const getUserComments = (id, numberOfCommentsToShow) => {
        return fetch(`http://localhost:3030/data/comments?where=_ownerId%3D%22${id}%22&pageSize=${numberOfCommentsToShow}`)
            .then(response => response.json())
    }

    const getComments = (gameId) => {
        return fetch(`http://localhost:3030/data/comments?where=_gameId%3D%22${gameId}%22&load=author%3D_ownerId%3Ausers`)
            .then(response => response.json())
    }

    const createComment = (newComment) => {
        
        return fetch('http://localhost:3030/data/comments', {
            method: 'POST',
            headers: getHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newComment),
        })
    }

    const editComment = (comment) => {
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
        })
    }

    const deleteComment = (commentId) => {
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