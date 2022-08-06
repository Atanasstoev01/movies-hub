import "./AdminUsersTable.scss";
import AdminUserData from "../AdminUserData/AdminUserData";
import PhoneModal from "../Modals/phoneNumberModal";
import { useState } from "react";
import { updateUserPhone, updateUserRole } from "../../services/users.services";
import { userRole } from "../../common/user-role";

function AdminUsersTable(props) {
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [updateForm, setCurrentHandleUpdate] = useState({
    currentHandleUpdate: null,
    phone: null
  })
  

  const updatePhoneNumber = () => {
    setShowPhoneModal(false)
    
    Promise.all([
      updateUserPhone(updateForm.currentHandleUpdate, updateForm.phone),
      updateUserRole(updateForm.currentHandleUpdate, userRole.ADMIN)
    ])
    props.onLoad()
  }

  const checkPhoneNum = (e, phone, username) => {
    const newRole = Number(e.target.value)
    if (newRole === userRole.ADMIN && !phone) {
      setShowPhoneModal(true)
      setCurrentHandleUpdate({
        ...updateForm,
        currentHandleUpdate: username
      })

      return;
    }

    updateUserRole(username, newRole)
    props.onLoad()
  }

  return (
    <div className="table">
      <PhoneModal onUpdate={updatePhoneNumber} show={showPhoneModal} updateForm={updateForm} updatePhone={setCurrentHandleUpdate} handle={updateForm.currentHandleUpdate} onClose={() => setShowPhoneModal(false)}/>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Users Table</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-wrap">
                <table className="table table-responsive-xl">
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
                          checkPhoneNum={checkPhoneNum}
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

export default AdminUsersTable;
