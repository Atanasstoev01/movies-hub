import { ref, push, get, update } from 'firebase/database';
import { db } from '../config/firebase-config';

const fromCommentsDocument = (snapshot) => {
    const commentsDocument = snapshot.val();

    return Object.keys(commentsDocument).map((key) => {
        const comment = commentsDocument[key];

        return {
            ...comment,
            id: key,
            createdOn: new Date(comment.createdOn),
            likedBy: comment.likedBy ? Object.keys(comment.likedBy) : [],
        };
    });
};

export const addComment = (content, handle, postId) => {

    return push(ref(db, 'comments'), {
        content,
        author: handle,
        createdOn: Date.now(),
        postId: postId,
    }).then((result) => {
        return getCommentById(result.key);
    });
};

export const getCommentById = (id) => {
    return get(ref(db, `comments/${id}`)).then((result) => {
        if (!result.exists()) {
            throw new Error(`Comment with id ${id} does not exist!`);
        }

        const comment = result.val();
        comment.id = id;
        comment.createdOn = new Date(comment.createdOn);
        if (!comment.likedBy) {
            comment.likedBy = [];
        }

        return comment;
    });
};

export const getAllcomments = () => {
    return get(ref(db, 'comments')).then((snapshot) => {
        if (!snapshot.exists()) {
            return [];
        }

        return fromCommentsDocument(snapshot);
    });
};
export const getAllCommentsByPostId = (postId) => {
    return getAllcomments()
        .then(content => content
            .filter(comment => comment.postId === postId))

}

export const likeComment = (handle, commentId) => {
    const updateLikes = {};
    updateLikes[`/comments/${commentId}/likedBy/${handle}`] = true;
    updateLikes[`/users/${handle}/likedcomments/${commentId}`] = true;

    return update(ref(db), updateLikes);
};

// if we set something to null in firebase it is deleted
export const dislikeComment = (handle, commentId) => {
    const updateLikes = {};
    updateLikes[`/comments/${commentId}/likedBy/${handle}`] = null;
    updateLikes[`/users/${handle}/likedcomments/${commentId}`] = null;

    return update(ref(db), updateLikes);
};
