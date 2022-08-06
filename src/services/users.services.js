import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { userRole } from '../common/user-role';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, firstName, lastName) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, firstName, lastName, createdOn: new Date(), likedPosts: {}, role: userRole.BASIC });
};

export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};



export const updateUserRole = (handle, role) => {
  return update(ref(db), {
    [`users/${handle}/role`]: role,
  });
};

export const updateUserPhone = (handle, phone) => {
  return update(ref(db), {
    [`users/${handle}/phone`]: phone,
  });
};

export const updateUserProfilePicture = (handle, url) => {
  return update(ref(db), {
    [`users/${handle}/img`]: url,
  });
};

export const updateUserEmail = (handle, email) => {
  return update(ref(db), {
    [`users/${handle}/email`]: email,
  });
};

  export const updateUserFirstName = (handle, firstName) => {
    return update(ref(db), {
      [`users/${handle}/firstName`]: firstName,
    });
  };

  
  export const updateUserLastName = (handle, lastName) => {
    return update(ref(db), {
      [`users/${handle}/firstName`]: lastName,
    });
  };
  
