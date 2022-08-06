import "./AdminPanel.css";
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";
import { getUserByHandle } from "../../services/users.services";
import { Component } from "react";

class AdminPanel extends Component {
  state = {
    users: [],
    key: 1
  };

  async loadData() {
    const users = (await getUserByHandle("")).val();
    this.setState({ users: users, key: this.state.key + 1 });
  }

  async componentDidMount() {
    await this.loadData()
  }

  render() {
    return (
      <div className="admin-panel">
        <AdminUsersTable key={this.state.key} onLoad={() => this.loadData()}  users={this.state.users} />
      </div>
    );
  }
}

export default AdminPanel;
