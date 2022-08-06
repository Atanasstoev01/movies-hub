import './Comments.css';
import { useState, useContext, useEffect } from 'react';
import AppContext from '../../providers/AppContext';
import { addComment, getAllcomments } from '../../services/comments.service';

function Comments() {
  const [comments, setComments] = useState([]);
  const {
    userData: { handle },
  } = useContext(AppContext);



  useEffect(() => {
    getAllcomments()
      .then(setComments)
      .catch(console.error);
  }, []);

  const createComment = (content) => {

    return addComment(content, handle)
      .then((comment) => {
        setComments([comment, ...comments]);
      });
  };
  // how the comments will be presented in the forum app
  return (
    <>

    </>
  );
}
export default Comments;
