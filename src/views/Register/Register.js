import { useState } from 'react';
import './Register.css';
import { registerUser } from '../../services/auth.service';
import { getUserByHandle, createUserHandle, checkUsers } from '../../services/users.services';
import { useNavigate } from 'react-router-dom';
import { userRole, userStatus } from '../../common/user-role';
import { Button, Modal } from 'react-bootstrap';

const Register = () => {
  // bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    email: '',
    password: '',
    handle: '',
    firstName: '',
    lastName: '',
    role: userRole.BASIC,
    status: userStatus.ACTIVE
  });

  const navigate = useNavigate();

  const updateForm = prop => e => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return alert('Password shoud be 6 or more characters');
    }

    if (!form.email.includes('@') || !form.email.includes('.')) {
      return alert('Not a valid email.')
    }

    if (form.firstName.length < 4 || form.firstName.length > 32 || form.lastName.length > 32 || form.lastName.length < 4) {
      return alert('First name and last name must be between 4 and 32 symbols.')
    }


    getUserByHandle(form.handle)
      .then(snapshot => {
        if (snapshot.exists()) {
          return alert(`User with handle @${form.handle} already exists!`);
        }

        return registerUser(form.email, form.password)
          .then(u => {
            createUserHandle(form.handle, u.user.uid, u.user.email, form.firstName, form.lastName)
              .then(() => {
                navigate('/home');
              })
              .catch(console.error);
          })
          .catch(e => {
            if (e.message.includes(`email-already-in-use`)) {
              alert(`Email ${form.email} has already been registered!`);
            }
          });
      })
      .catch(console.error);
  };

  return (
    // <div className='Register'>
    //   <div className='Form'>
    //     <label htmlFor='email'>Email: </label>
    //     <input type="email" id="email" value={form.email} onChange={updateForm('email')}></input><br />

    //     <label htmlFor='text'>First name: </label>
    //     <input type="text" id="first-name" value={form.firstName} onChange={updateForm('firstName')}></input><br />
    //     <label htmlFor='text'>Last name: </label>
    //     <input type="text" id="last-name" value={form.lastName} onChange={updateForm('lastName')}></input><br />

    //     <label htmlFor='handle'>Handle: </label>
    //     @<input type="text" id="handle" value={form.handle} onChange={updateForm('handle')}></input><br />
    //     <label htmlFor='password'>Password: </label>
    //     <input type="password" id="password" value={form.password} onChange={updateForm('password')}></input><br /><br />
    //     <button onClick={register}>Register</button>
    //   </div>
    // </div>

    <>
    <button type="button" className="btn btn-outline-light" onClick={handleShow}>
      Register
    </button>
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='Form'>
          <label htmlFor='email'>Email: </label>
          <input type="email" id="email" value={form.email} onChange={updateForm('email')}></input><br />

          <label htmlFor='text'>First name: </label>
          <input type="text" id="first-name" value={form.firstName} onChange={updateForm('firstName')}></input><br />
          <label htmlFor='text'>Last name: </label>
          <input type="text" id="last-name" value={form.lastName} onChange={updateForm('lastName')}></input><br />

          <label htmlFor='handle'>Handle: </label>
          @<input type="text" id="handle" value={form.handle} onChange={updateForm('handle')}></input><br />
          <label htmlFor='password'>Password: </label>
          <input type="password" id="password" value={form.password} onChange={updateForm('password')}></input><br /><br />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={register}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default Register;
