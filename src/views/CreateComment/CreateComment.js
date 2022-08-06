import { useState } from 'react';
import './CreateComment.css';
import { Button, Modal } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import { addComment } from '../../services/comments.service';

function CreateComment({ onSubmit }) {
  const [content, setContent] = useState('');

  // text editor
  const [text, setText] = useState('');

  // bootstrap modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const createReply = (e) => {
    e.preventDefault();

    onSubmit(content)
      .then(() => {
        setContent('');
        alert('Reply created!');
      })
      .catch((e) => alert(e.message));
  };



  const removeTags = (body) => {
    const regex = /(<([^>]+)>)/gi;

    return body.replace(regex, '');
  };

  return (
    <>
      <button type="button" className="btn btn-light" onClick={handleShow}>
        <span className="bi bi-reply"></span> Reply
      </button>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reply:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='Editor'>
            <div className='editor'>
              <CKEditor
                editor={ClassicEditor}
                data={text}
                value={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                  setContent({
                    ...content,
                    content: removeTags(text) //removeTags(text)
                  });
                }}
              />
            </div>
            <div>
              <h5>Content Preview</h5>
              <ul>{parse(text)}</ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={createReply}>
            <span className="bi bi-reply"></span>Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateComment;
