import './EditUserDetail.scss';
import AdminUserData from '../AdminUserData/AdminUserData';
import UserDetailsModal from '../Modals/editUserDetailsModal';
import { useState } from 'react';
import {
  updateUserEmail,
  updateUserFirstName,
  updateUserLastName,
  updateUserPhone,
  updateUserRole,
} from '../../services/users.services';
import { userRole } from '../../common/user-role';

function EditUsersDetail(props) {
  const [showUserDetailModal, setUserDetailModal] = useState(false);
  const [form, setForm] = useState({
    handle: props.handle,
    email: props.email,
    firstName: props.firstName,
    lastName: props.lastName,
    phone: props.phone,
  });

  const updateUserDetail = () => {
    setUserDetailModal(false);

    Promise.all([
      updateUserEmail(form.setForm, form.email),
      updateUserFirstName(form.setForm, form.firstName),
      updateUserLastName(form.setForm, form.lastName),
      updateUserPhone(form.setForm, form.phone),
    ]);
    props.onLoad();
  };

  const checkUserDetail = (e, email, firstName, lastName, username) => {
    const newRole = Number(e.target.value);
    if (userRole) {
      setUserDetailModal(true);
      setForm({
        ...form,
        currentHandleUpdate: username,
      });

      return;
    }

    updateUserRole(username, newRole);
    props.onLoad();
  };

  return (
    <div className='table'>
      <UserDetailsModal
        onUpdate={updateUserDetail}
        show={showUserDetailModal}
        form={form}
        updateUserEmail={setForm}
        handle={form.currentHandleUpdate}
        onClose={() => setUserDetailModal(false)}
      />
      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6 text-center mb-5'>
              <h2 className='heading-section'>Users Table</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='table-wrap'>
                <table className='table table-responsive-xl'>
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>User Role</th>
                      <th>Status</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(props.users).map((u, id) => {
                      return (
                        <AdminUserData
                          checkPhoneNum={checkUserDetail}
                          key={id}
                          firstLastName={`${u[1].firstName} ${u[1].lastName}`}
                          username={u[1].handle}
                          role={u[1].role}
                          email={u[1].email}
                          status={u[1].status}
                          image={u[1].img}
                          phone={u[1].phone}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditUsersDetail;
