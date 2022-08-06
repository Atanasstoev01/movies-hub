import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../providers/AppContext.js';
import ProfilePic from './profile.svg';
import './Profile.css';
import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../config/firebase-config';
import { updateUserProfilePicture } from '../../services/users.services';
import { getAllPosts, getPostsByAuthor } from '../../services/posts.service.js';
import Post from '../../components/Post/Post.js';

function Profile() {
  const [posts, setPosts] = useState([]);
  const { user, userData, setContext } = useContext(AppContext);

  const picture = userData.img ? userData.img : ProfilePic;
  const dateReg = /[0-9]+ [A-Za-z]+ [0-9]+/;
  const dateCreated = user.metadata.creationTime.match(dateReg);
  const dateLastSign = user.metadata.lastSignInTime.match(dateReg);

  const firstLastName = `${userData.firstName} ${userData.lastName}`;

  const uploadPicture = (e) => {
    e.preventDefault();
    let file = e.target[0]?.files?.[0];

    if (!file) return alert('Please select a file');

    const picture = StorageRef(storage, `images/${user.uid}/avatar`);
    uploadBytes(picture, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          return updateUserProfilePicture(userData.handle, url).then((snap) => {
            setContext({
              user,
              userData: {
                ...userData,
                img: url,
              },
            });
          });
          console.log(url);
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getPostsByAuthor(userData.handle)
      .then(setPosts)
      .catch((e) => console.log(e));
  });

  return (
    <div className='profile-wrapper'>
      <div className='left'>
        <form onSubmit={uploadPicture}>
          <input type='file' name='file' />
          <button type='submit'>Upload</button>
        </form>
        <img src={picture} />
        <h4 className='name'>{firstLastName}</h4>
        <p className='username'>{userData.handle}</p>
      </div>
      <div className='right'>
        <h3>Profile Information</h3>
        <div className='user-info'>
          <div className='data'>
            <h4>Email</h4>
            <p>{userData.email}</p>
          </div>
          <div className='data'>
            <h4>Phone</h4>
            <p>{userData.phone ? userData.phone : 'No number'}</p>
          </div>
          <div className='data'>
            <h4>User Role</h4>
            <p>{userData.role === 2 ? 'Admin user' : 'Regular user'}</p>
          </div>
          <div className='data'>
            <h4>Joined</h4>
            <p>{dateCreated}</p>
          </div>
          <div className='data'>
            <h4>Last Sign</h4>
            <p>{dateLastSign}</p>
          </div>
        </div>

        <h3>Posts</h3>
        <div className='posts'>
          <div className='data'>
            <h4>Recent posts</h4>
            <div className='Posts'>
              {posts.length === 0 ? (
                <p>No posts to show.</p>
              ) : (
                posts.map((post, key) => <Post key={key} post={post} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
