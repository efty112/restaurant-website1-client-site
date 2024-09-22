import { createContext, useEffect, useState } from "react";
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAxiosPublic from "../CustomHooks/useAxiosPublic";


export const LevelContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {

                const userInfo = { email: currentUser.email }

                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }

            console.log('current', currentUser)
            setLoading(false);
        });

        return unsubscribe;
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        signUpUser,
        signInUser,
        googleSignIn,
        signOutUser
    }

    return (
        <LevelContext.Provider value={authInfo}>
            {
                children
            }
        </LevelContext.Provider>
    );
};

export default AuthProvider;