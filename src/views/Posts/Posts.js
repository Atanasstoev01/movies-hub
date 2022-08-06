import './Posts.css';
import Post from '../../components/Post/Post';
import { useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../providers/AppContext';
import { useEffect } from 'react';
import { getAllPosts, addPost, likePost, dislikePost } from '../../services/posts.service';
import CreatePost from '../CreatePost/CreatePost';

function Posts() {
  const [posts, setPosts] = useState([]);
  const {
    userData: { handle },
  } = useContext(AppContext);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(console.error);
  }, []);

  const createPost = (title, content) => {
    
    return addPost(title, content, handle)
    .then((post) => {
      setPosts([post, ...posts]);
    });
  };

  const like = (post) => {
    likePost(handle, post.id)
      .then(() => {
        setPosts(posts.map(p => {
          if(p.id === post.id) {
            p.likedBy.push(handle)
          }

          return p;
        }))
      })
  }

  const dislike = (post) => {
    dislikePost(handle, post.id)
      .then(() => {
        setPosts(posts.map(p => {
          if(p.id === post.id) {
            p.likedBy = p.likedBy.filter(h => h !== handle);
          }

          return p;
        }))
      })
  }

  const removePost = (id) => {
    setPosts(posts.filter(e => e.id !== id))
  }

  return (
    <>
      <div className='additional-nav'>
        <h1 className='title-additional-nav'>Add posts about movies</h1>
        <CreatePost onSubmit={createPost} />
      </div>

      <div className='Posts'>
        {posts.length === 0 ? (
          <p>No posts to show.</p>
        ) : (
          posts.map((post, key) => <Post key={key} onDelete={() => removePost(post.id)} post={post} like={like} dislike={dislike} />)
        )}
      </div>
    </>
  );
}

export default Posts;
