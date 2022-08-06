import './TopRecentPosts.css';
import TopPost from '../../components/TopPost/TopPost';
import { useState, useEffect } from 'react';
import { getMostRecentPosts } from '../../services/posts.service';

function TopRecentPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getMostRecentPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <>
      <div className='additional-nav-top'>
        <h1 className='title-top-posts'>Top 10 most recent posts</h1>
        <span className='top'>
          <i>To see all posts, like and comment, please Login!</i>
        </span>
      </div>

      <div className='Posts'>
        {posts.length === 0 ? (
          <p>No posts to show.</p>
        ) : (
          posts
            .sort((a, b) => (b.likes > a.likes ? 1 : -1))
            .map((post, key) => <TopPost key={key} post={post} />)
        )}
      </div>
    </>
  );
}

export default TopRecentPosts;
