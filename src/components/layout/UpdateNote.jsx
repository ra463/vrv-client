import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosUtils";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "sonner";
import "./Note.scss";

const UpdateNote = ({ setShowUpdateNote, cardData }) => {
  const { token } = useSelector((state) => state.user);

  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axiosInstance.patch(
        `/api/note/update-note/${cardData._id}`,
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setShowUpdateNote(false);
        setTitle("");
        setDescription("");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add_task">
      <div className="new_task">
        <div className="task_head">
          <h2>Edit Your Task</h2>
          <span onClick={() => setShowUpdateNote(false)}>
            <MdOutlineClose />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title of the Task"
          />

          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
          />

          <div className="btn">
            <button onClick={() => setShowUpdateNote(false)}>Cancel</button>
            <button disabled={loading} type="submit">
              {loading ? <PulseLoader color="white" size={6} /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
