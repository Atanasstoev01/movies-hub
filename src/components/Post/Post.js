import { formatFullDate } from "../../utils/date.util";
import "./Post.css";
import { useContext, useState } from 'react';
import AppContext from '../../providers/AppContext';
import { Card, Button } from 'react-bootstrap';
import CreateComment from "../../views/CreateComment/CreateComment";
import { addComment, getAllcomments, getAllCommentsByPostId } from "../../services/comments.service";
import { deletePost } from '../../services/posts.service';
import { userRole } from "../../common/user-role";
import { useEffect } from "react";

//import { getAllComments, addComment } from '../../services/comments.service'; => to be implemented

/**
 *
 * @param {{ post: { id: string, title: string, content: string, author: string, date: Date, likedBy: string[] } }} post
 */
function Post(props) {
  let { post, like, dislike } = props;
  const { userData: { handle, role } } = useContext(AppContext);
  const [comments, setComments] = useState([]);

  const isPostLiked = () => post.likedBy.includes(handle);
  const isPostAuthor = () => post.author === handle;

  useEffect(() => {
    getAllCommentsByPostId(post.id)
      .then(setComments)
      .catch(console.error)
  }, [])

  // useEffect(() => {
  //   getAllcomments()
  //     .then(setComments)
  //     .catch(console.error)
  // }, [])

  const createComment = (content) => {

    return addComment(content, handle, post.id)
      .then((comment) => {
        setComments([comment, ...comments]);
      });
  };



  return (
    <Card border="primary" style={{ width: '45rem' }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <i>Author: </i>{post.author}
          <span className="post-date">{formatFullDate(post.createdOn)}</span>
        </Card.Subtitle>
        <Card.Text>
          {post.content}
        </Card.Text>
        <div className='Post-Meta'>
          <span>Likes: {post.likedBy.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant='light' onClick={isPostLiked() ? () => dislike(post) : () => like(post)}>
            {isPostLiked() ? 'Dislike' : 'Like'}
          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <CreateComment onSubmit={createComment} />&nbsp;&nbsp;&nbsp;&nbsp;
          {role === userRole.ADMIN &&
            <Button variant='light' onClick={() => {
              deletePost(post.id);
              post = null;
              props.onDelete()
            }}>
              Delete Post
            </Button>} &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className='Comments'>
          {comments.length === 0 ? (
            <p>No comments to show.</p>
          ) : (
            // comments.map((comment) => <CommentForPost comment={ } />)

            comments.map(comment =>
              <Card.Body>
                <Card.Subtitle>
                  <i>Author: </i>{comment.author}
                  <span className="comment-date">{formatFullDate(comment.createdOn)}</span>

                </Card.Subtitle>
                <Card.Text><i>Comment: </i>{comment.content.content}</Card.Text></Card.Body>)
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;
