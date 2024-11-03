import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PublicRouting({children}) {
    const user = useSelector((store)=>store.authSlice.user)

    return user ? <Navigate to="/" /> : children;
}
