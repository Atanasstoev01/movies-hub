import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Posts from './views/Posts/Posts';
import Profile from './views/Profile/Profile';
import CreatePost from './views/CreatePost/CreatePost';
import AboutUs from './views/AboutUs/AboutUs';
import Login from './views/Login/Login';
import AdminPanel from './views/AdminPanel/AdminPanel';
import Home from './views/Home/Home';
import AppContext from './providers/AppContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './views/Register/Register';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Authenticated from './hoc/Authenticated';
import { logoutUser } from './services/auth.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './services/users.services';
import TopPostNav from './components/TopPostNav/TopPostNav';
import { userRole } from './common/user-role';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [user] = useAuthState(auth);

  // update the user in the app state to match the one retrieved from the hook above
  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Something went wrong!');
        }

        setAppState({
          user,
          userData: snapshot.val()[Object.keys(snapshot.val())[0]],
        });
      })
      .catch((e) => alert(e.message));
  }, [user]);

  const logout = () => {
    logoutUser().then(() => {
      setAppState({
        user: null,
        userData: null,
      });
    });
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
        <div className='container'>
          <Header />
          <Navbar bg='primary' variant='dark' expand='lg'>
            <Navbar.Brand as={Link} to={'/home'}>
              <img className='logo' src={'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'} alt='Logo' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              {appState.user !== null ? (
                <Nav className='mr-auto'>
                  <Nav.Link as={Link} to={'/posts'}>
                    Posts
                  </Nav.Link>

                  {appState.userData?.role === userRole.ADMIN && (
                    <Nav.Link as={Link} to={'/admin'}>
                      Admin Panel
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to={'/profile'}>
                    Profile
                  </Nav.Link>
                  <Button variant='outline-light' onClick={logout}>
                    Logout
                  </Button>
                </Nav>
              ) : null}

              {appState.user === null ? (
                <Nav className='mr-auto-custom'>
                  <Register />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Login />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </Nav>
              ) : null}

              <Form className='d-flex'>
                <FormControl
                  type='search'
                  placeholder='Search'
                  className='mr-2'
                  aria-label='Search'
                />
                <Button variant='outline-light'>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          {appState.user === null ? <TopPostNav /> : null}

          <div className='Content'>
            <Routes>
              <Route index element={<Home />} />
              <Route path='home' element={<Home />} />
              <Route
                path='/admin'
                element={
                  <Authenticated>
                    <AdminPanel />
                  </Authenticated>
                }
              />
              <Route
                path='/profile'
                element={
                  <Authenticated>
                    <Profile />
                  </Authenticated>
                }
              />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route
                path='/create-post'
                element={
                  <Authenticated>
                    <CreatePost />
                  </Authenticated>
                }
              />
              <Route
                path='/posts'
                element={
                  <Authenticated>
                    <Posts />
                  </Authenticated>
                }
              />
              <Route path='/about-us' element={<AboutUs />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
