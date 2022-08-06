import {
  ref,
  push,
  get,
  update,
  query,
  orderByChild,
  equalTo,
  increment,
  limitToLast,
} from 'firebase/database';
import { db } from '../config/firebase-config';

const fromPostsDocument = (snapshot) => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map((key) => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],

    };
  });
};

export const addPost = (title, content, handle) => {
  return push(ref(db, 'posts'), {
    title,
    content,
    author: handle,
    createdOn: Date.now(),
    likes: 0,
  }).then((result) => {
    return getPostById(result.key);
  });
};

export const getPostById = (id) => {
  return get(ref(db, `posts/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Post with id ${id} does not exist!`);
    }

    const post = result.val();
    post.id = id;
    post.createdOn = new Date(post.createdOn);
    if (!post.likedBy) {
      post.likedBy = [];
    }

    return post;
  });
};

export const getAllPosts = () => {
  return get(ref(db, 'posts')).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromPostsDocument(snapshot);
  });
};

const updateLikesCount = async (postId) => {
  await update(ref(db, `/posts/${postId}/`), {
      likes: increment(1)
  });
} 

export const likePost = (handle, postId) => {
  updateLikesCount(postId);

  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};


const updateDislikesCount = async (postId) => {
  await update(ref(db, `/posts/${postId}/`), {
      likes: increment(-1)
  });
} 

export const dislikePost = (handle, postId) => {
  updateDislikesCount(postId);

  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const deletePost = async (id) => {
  const post = await getPostById(id);
  const updateLikes = {};

  post.likedBy.forEach(handle => {
    updateLikes[`/users/${handle}/likedPosts/${id}`] = null;
  });

  await update(ref(db), updateLikes);

  return update(ref(db), {
    [`/posts/${id}`]: null,
  });
};

export const getPostsByAuthor = (handle) => {
  return get(
    query(ref(db, 'posts'), orderByChild('author'), equalTo(handle)),
  ).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromPostsDocument(snapshot);
  });
};

export const getMostLikedPosts = () => {
  return get(
    query(ref(db, 'posts'), orderByChild(`likes`), limitToLast(10)),
  ).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromPostsDocument(snapshot);
  });
};

export const getMostRecentPosts = () => {
  return get(
    query(ref(db, 'posts'), orderByChild(`createdOn`), limitToLast(4)),
  ).then((snapshot) => {
    if (!snapshot.exists()) {
      return [];
    }

    return fromPostsDocument(snapshot);
  });
};
