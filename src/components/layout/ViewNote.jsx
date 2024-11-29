import { MdOutlineClose } from "react-icons/md";
import moment from "moment";

const ViewNote = ({ setShowNote, cardData }) => {
  return (
    <div className="add_task">
      <div className="new_task">
        <div className="task_head">
          <h2>Task Details</h2>
          <span onClick={() => setShowNote(false)}>
            <MdOutlineClose />
          </span>
        </div>
        <div className="details">
          <h3>Title: {cardData.title}</h3>
          <div className="view">
            <p>Description: {cardData.description}</p>
            <p style={{ fontSize: "14px" }}>
              Created At: {moment(cardData.createdAt).format("lll")}
            </p>
          </div>
          <div className="btn">
            <button
              onClick={() => {
                setShowNote(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
