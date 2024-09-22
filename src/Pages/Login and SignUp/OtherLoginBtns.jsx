import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../CustomHooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const OtherLoginBtns = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                // console.log(user);
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photoUrl: user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                .then(res => console.log(res.data))

                if (location.state) {
                    navigate(location.state)
                }

                else {
                    navigate('/');
                }

            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    return (
        <div className="text-4xl flex gap-14 justify-center">
            <button>
                <FaFacebookF className="border-2 border-black p-1 rounded-full" />
            </button>

            <button onClick={handleGoogleSignIn}>
                <FaGoogle className="border-2 border-black p-1 rounded-full" />
            </button>

            <button>
                <FaGithub className="border-2 border-black p-1 rounded-full" />
            </button>
        </div>
    );
};

export default OtherLoginBtns;