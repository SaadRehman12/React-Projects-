import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, getNotes } from "../../store/slices/notesSlice";
import { getUsers } from "../../store/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./card.css";
import { useNavigate } from "react-router-dom";

export default function NoteCard() {
  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notesSlice.note);
  const users = useSelector((store) => store.authSlice.userNotes);
  const navigate = useNavigate();

  const deleteNote = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this note");
    if (confirm) {
      dispatch(deleteNotes(id));
    }
  };

  const updateNote = (id) => {
    navigate(`/Addnote/${id}`);
  };

  useEffect(() => {
    dispatch(getNotes());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ml-4 p-4 mt-16">
      {Array.isArray(notes) &&
        notes.map((note) => {
          const user = Array.isArray(users)
            ? users.find((user) => user.uid === note.userId)
            : null;
          const noteWithUser = user ? { ...note, userDetails: user } : note;

          return (
            <div key={note.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => updateNote(note.id)}
                  className="p-4 text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faEdit} className="text-2xl" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-4 text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-2xl" />
                </button>
              </div>

              {/* User Info Section */}
              <div className="flex items-center mb-6 bg-blue-100 p-4 rounded-lg">
                <img
                  src={
                    noteWithUser.userDetails?.profileImageUrl ||
                    "https://via.placeholder.com/150"
                  }
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mr-5 border-2 border-blue-400"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700">
                    {noteWithUser.userDetails?.name || "Unknown User"}
                  </h3>
                  <p className="text-blue-500 text-lg">
                    {noteWithUser.createdAt && noteWithUser.createdAt.seconds
                      ? new Date(noteWithUser.createdAt.seconds * 1000).toLocaleDateString()
                      : "Date Unknown"}
                  </p>
                </div>
              </div>

              {/* Note Content */}
              <h4 className="text-2xl font-bold mb-3 text-gray-800">
                {noteWithUser.title || "No Title"}
              </h4>
              <span className="bg-blue-200 text-blue-900 text-sm font-semibold mr-2 px-3 py-1 rounded-full">
                {noteWithUser.category || "Uncategorized"}
              </span>
              <p className="text-lg text-gray-700 mt-4">
                {noteWithUser.content || "No content available."}
              </p>
            </div>
          );
        })}
    </div>
  );
}
