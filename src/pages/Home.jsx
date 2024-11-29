import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "../components/styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import AddNote from "../components/layout/AddNote";
import { Navigate } from "react-router-dom";
import { getAllNotes } from "../features/apiFeature";
import PulseLoader from "react-spinners/PulseLoader";
import moment from "moment";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosUtils";
import UpdateNote from "../components/layout/UpdateNote";
import ViewNote from "../components/layout/ViewNote";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  const { notes } = useSelector((state) => state.note);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showUpdateNote, setShowUpdateNote] = useState(false);
  const [showViewNote, setShowViewNote] = useState(false);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this task?")) return;
      setDeleteLoading(true);

      const { data } = await axiosInstance.delete(
        `/api/note/delete-note/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
        setDeleteLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    getAllNotes(dispatch, setLoading, search, token);
  }, [search]);

  return token ? (
    <>
      <Header />

      <div className="home">
        <div className="head">
          <button onClick={() => setShowNote(true)}>Add New Note</button>
          <div className="filters">
            <div className="search">
              <span>Search:</span>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search By Title..."
              />
            </div>
          </div>
        </div>
        {loading ? (
          <PulseLoader size={10} color="#3273f5" />
        ) : (
          <div className="allnotes">
            {notes && notes.length > 0 ? (
              notes.map((data, i) => (
                <div key={i} className="card-container">
                  <h3>Title: {data.title}</h3>
                  <div className="details">
                    <p>
                      Description:{" "}
                      {data.description.length > 50
                        ? data.description.slice(0, 50).concat("...")
                        : data.description}
                    </p>
                    <span>
                      Created At: {moment(data.createdAt).format("lll")}
                    </span>
                  </div>

                  <div className="btns">
                    <button onClick={() => handleDelete(data._id)}>
                      {deleteLoading ? (
                        <PulseLoader color="white" />
                      ) : (
                        "Delete Note"
                      )}
                    </button>
                    <button onClick={() => setShowUpdateNote(true)}>
                      Edit
                    </button>
                    <button onClick={() => setShowViewNote(true)}>
                      View Details
                    </button>
                  </div>

                  {showUpdateNote && (
                    <UpdateNote
                      setShowUpdateNote={setShowUpdateNote}
                      cardData={data}
                    />
                  )}
                  {showViewNote && (
                    <ViewNote setShowNote={setShowViewNote} cardData={data} />
                  )}
                </div>
              ))
            ) : (
              <h1 className="note_not_found">No Notes Found</h1>
            )}
          </div>
        )}
        {showNote && <AddNote setShowNote={setShowNote} />}
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
