import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../store/slices/notesSlice";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

export default function Addnotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const users = useSelector((store) => store.authSlice.user);
  const { id } = useParams();
  
  const existingNote = useSelector((store) =>
    store.notesSlice.note.find((note) => note.id === id)
  );

  // Yup validation schema
  const schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    content: Yup.string()
      .min(6, "Content must be at least 6 characters")
      .required("Content is required"),
    category: Yup.string()
      .required("Category is required"),
  });

  useEffect(() => {
    if (id && existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setCategory(existingNote.category);
    }
  }, [id, existingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const note = {
      userId: users.uid,
      title,
      content,
      category,
    };

    try {
      // Validate the note data
      await schema.validate(note, { abortEarly: false });
      setErrors({});
      
      if (id) {
        const resultAction= await dispatch(updateNote({ id, ...note }));
        if (updateNote.fulfilled.match(resultAction)) {
            navigate("/")
        }
      } else {

       const resultData= await dispatch(createNote(note));
       if (createNote.fulfilled.match(resultData)) {
        navigate("/")
    }
      }

      // Clear the form fields
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors = {};
        error.inner.forEach(err => {
          formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-10 border border-gray-300 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          {id ? "Update a Note" : "Add a New Note"} 
        </h2>

        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            placeholder="Enter the note title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            rows="5"
            placeholder="Write your note content here..."
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
          >
            <option value="" disabled>Select Category</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Programming">Programming</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
        >
          {id ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}
