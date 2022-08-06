import { useState } from 'react';
import './CreatePost.css';
import { Button, FormControl, Modal } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

function CreatePost({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  // text editor
  const [text, setText] = useState('');

  // bootstrap modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    if (form.title.length < 16 || form.title.length > 64) {
      return alert('Post Title must be between 16 and 64 symbols.')
      
    }

    if (form.content.length < 32 || form.content.length > 8192) {
      return alert('Post Content must be between 32 and 8192 symbols.')
    }

    onSubmit(form.title, form.content)
      .then(() => {
        setForm('');
        alert('Post created!');
      })
      .catch((e) => alert(e.message));
  };

  const removeTags = (body) => {
    const regex = /(<([^>]+)>)/gi;

    return body.replace(regex, '');
  };

  return (
    <>
      <Button variant='secondary' onClick={handleShow}>
        CreatePost
      </Button>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <textarea value={content} onChange={e => setContent(e.target.value)}></textarea> */}
          <FormControl
            size='ml'
            type='text'
            placeholder='Title'
            value={form.title}
            onChange={updateForm('title')}
          ></FormControl>

          <br></br>

          <div className='Editor'>
            <div className='editor'>
              <CKEditor
                editor={ClassicEditor}
                data={text}
                value={form.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                  setForm({
                    ...form,
                    content: removeTags(text),
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
          <Button variant='primary' onClick={createPost}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost;
