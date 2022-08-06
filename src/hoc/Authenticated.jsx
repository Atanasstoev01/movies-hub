import { useContext } from "react";
import AppContext from "../providers/AppContext";
import { Navigate } from "react-router-dom";

export default function Authenticated ({ children }) {
    const { user } = useContext(AppContext);

    if(!user) {
        return <Navigate to="/" />
    }

    return children;
}