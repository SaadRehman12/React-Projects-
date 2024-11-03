import { Link } from "react-router-dom";

export default function Button() {
    return (
      <Link to="/Addnote" className="fixed mt-4 right-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full shadow-lg transition duration-200">
        Create Note
      </Link>
    );
  }
  