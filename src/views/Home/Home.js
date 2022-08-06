import './Home.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {

  const location = useLocation();
  const navigate = useNavigate();

  if (location.state?.from?.pathname) {
    navigate(location.state.from.pathname);
  }

  return (
    <div className='Home'>
      <h1>Movie Hunter Blog Post</h1>
      <p>Join and <em>share information</em> with your friends.</p>
    </div>
  )
};

export default Home;
