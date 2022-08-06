
import { useState, useContext } from 'react';
import './Login.css';
import { loginUser } from '../../services/auth.service';
import AppContext from '../../providers/AppContext';
import { getUserData } from '../../services/users.services';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';



const Login = () => {
  // bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const updateForm = prop => e => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    loginUser(form.email, form.password)
      .then(u => {

        return getUserData(u.user.uid)
          .then(snapshot => {
            if (snapshot.exists()) {
              setContext({
                user: u.user,
                userData: snapshot.val()[Object.keys(snapshot.val())[0]],
              });

              navigate('/home');
            }
          });
      })
      .catch(console.error);
  };

  return (
    <>
      <button type="button" className="btn btn-outline-light" onClick={handleShow}>
        Login
      </button>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='Form'>
            <label htmlFor='email'>Email: </label>
            <input type="email" id="email" value={form.email} onChange={updateForm('email')}></input><br />
            <label htmlFor='password'>Password: </label>
            <input type="password" id="password" value={form.password} onChange={updateForm('password')}></input><br /><br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;

