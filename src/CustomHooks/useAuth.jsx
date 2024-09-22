import { useContext } from "react";
import { LevelContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const auth = useContext(LevelContext);
    return auth;
};

export default useAuth;