import { formatFullDate } from "../../utils/date.util";
import "./TopPost.css";
import { Card } from 'react-bootstrap';

/**
 *
 * @param {{ post: { id: string, title: string, content: string, author: string, date: Date, likes: Number likedBy: string[] } }} post
 */
function TopPost({ post }) {
  
  return (
    <Card border="primary" style={{ width: '45rem' }}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <i>Author: </i>{post.author}
          <span className="post-date">{formatFullDate(post.date)}</span>
          </Card.Subtitle>
        <Card.Text>
        {post.content}
        </Card.Text>
        <div className='Post-Meta'>
        <span>Likes: {post.likedBy.length}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </Card.Body>
    </Card>
  );
}
export default TopPost;
