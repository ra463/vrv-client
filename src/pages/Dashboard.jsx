import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Header from "../components/Header/Header";
import { Navigate } from "react-router-dom";
import "../components/styles/Admin.scss";
import { useEffect, useState } from "react";
import { getAllAdminNotes, getAllAdminUsers } from "../features/apiFeature";
import { useDebounce } from "../utils/useDebounce";
import PulseLoader from "react-spinners/PulseLoader";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.user);
  const { notes, users } = useSelector((state) => state.admin);

  const [searchNote, setSearchNote] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selected, setSelected] = useState("user");
  const [loading, setLoading] = useState(false);

  const debouncedSearchNote = useDebounce(searchNote, 800);
  const debouncedSearchUser = useDebounce(searchUser, 800);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selected === "note") {
      getAllAdminNotes(dispatch, setLoading, debouncedSearchNote, token);
    } else {
      getAllAdminUsers(dispatch, setLoading, debouncedSearchUser, token);
    }
  }, [selected, debouncedSearchNote, debouncedSearchUser]);

  if (!token || user?.role !== "admin") {
    toast.error("You must be an admin to access the dashboard!");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="home">
        <div className="admin-head">
          <span
            onClick={() => setSelected("note")}
            className={`${selected === "note" && "active"}`}
          >
            All Note&apos;s
          </span>
          <span
            onClick={() => setSelected("user")}
            className={`${selected === "user" && "active"}`}
          >
            All User&apos;s
          </span>
        </div>

        {selected === "note" ? (
          <>
            <input
              type="text"
              placeholder="Search By Title"
              onChange={(e) => setSearchNote(e.target.value)}
              value={searchNote}
              className="search-input"
            />

            {loading ? (
              <PulseLoader size={10} color="#3273f5" />
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {notes && notes.length > 0 ? (
                    notes.map((note) => (
                      <tr key={note._id}>
                        <td>{note.title}</td>
                        <td>{note.description}</td>
                        <td>{note.name}</td>
                        <td>{new Date(note.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(note.updatedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No Notes Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search By Email/Name"
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser}
              className="search-input"
            />

            {loading ? (
              <PulseLoader size={10} color="#3273f5" />
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No User Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
