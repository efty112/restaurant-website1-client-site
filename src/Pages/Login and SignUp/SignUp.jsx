import { FaEye, FaEyeSlash } from "react-icons/fa";
import img1 from '../../assets/others/authentication2.png'
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import OtherLoginBtns from "./OtherLoginBtns";

const SignUp = () => {
    const { signUpUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [errorMsg, setErrorMsg] = useState('')
    const [seePassword, setSeePassword] = useState(false);
    const [seeIcon, setSeeIcon] = useState(false)

    const auth = getAuth(app);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setSeeIcon(false)
        if (event.target.value) {
            setSeeIcon(true)
        }
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        setErrorMsg('');

        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).[^\s]{8,20}$/;

        if (!name || !email || !password || !photoUrl) {
            setErrorMsg('All fields are required');
            return;
        }

        if (passwordRegex.test(password)) {
            signUpUser(email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // ...
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: photoUrl
                    })
                    const userInfo = {
                        name,
                        email,
                        photoUrl
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                form.reset();
                                navigate('/');
                            }
                        })
                    // console.log(user)

                })
                .catch((error) => {
                    
                    const errorMessage = error.message;
                    // ..
                    console.log(errorMessage)
                    setErrorMsg('Something went wrong!')
                });
        }
        else {
            setErrorMsg('Password should contain minimum 8 and maximum 20 characters, At least one uppercase, one digit and one special character. Don\'t use any space!')
        }
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
                <link rel="canonical" href="" />
            </Helmet>

            <div className='lg:max-w-7xl lg:mx-auto lg:space-y-10'>

                <div className="hero bg-logIn-pattern min-h-screen">

                    <div className={`bg-logIn-pattern lg:w-5/6 h-5/6 lg:flex flex-row-reverse justify-center items-center shadow-[5px_10px_10px_5px_rgba(0,0,0,0.3)] px-10`}>

                        {/* Left Side */}
                        <div >
                            <img src={img1} />
                        </div>

                        {/* Right Side (Form) */}
                        <div className="lg:w-2/4">
                            <p className="text-3xl font-bold text-center mt-6">Sign Up</p>

                            <form onSubmit={handleSignUp} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Enter Name" className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Photo Url</span>
                                    </label>
                                    <input type="url" name="photoUrl" placeholder="Enter Photo URL" className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="Enter Email" className="input input-bordered" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">Password</span>
                                    </label>

                                    <div className="flex justify-end items-center">
                                        <input type={`${seePassword ? 'text' : 'password'}`} onChange={handlePasswordChange} name="password" placeholder="Enter Password" className="w-full input input-bordered" />
                                        {
                                            seeIcon ? <div onClick={() => setSeePassword(!seePassword)} className="absolute p-3">
                                                {
                                                    seePassword ? <FaEye /> : <FaEyeSlash />
                                                }
                                            </div> : ''
                                        }

                                    </div>

                                    {/* <label className="label">
        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
    </label> */}
                                </div>

                                {
                                    <p className="text-center text-red-500">{errorMsg}</p>
                                }

                                <div className="form-control mt-3">
                                    <button className="btn bg-[#D1A054] text-white">
                                        <input type="submit" value="Sign Up" />
                                    </button>
                                </div>
                            </form>

                            <div className="text-center space-y-2">
                                <p className="text-[#D1A054]">Already registered? <Link to='/login'><span className="font-bold hover:underline">Go to log in</span></Link></p>
                            </div>

                            <div className="space-y-5 my-7 text-center">
                                <p>Or Sign Up with</p>
                                <OtherLoginBtns></OtherLoginBtns>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUp;