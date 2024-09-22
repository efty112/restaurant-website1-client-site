import { FaEye, FaEyeSlash } from "react-icons/fa";
import img1 from '../../assets/others/authentication2.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../CustomHooks/useAuth";
import OtherLoginBtns from "./OtherLoginBtns";

const Login = () => {
    const { signInUser } = useAuth();
    const [errorMsg, setErrorMsg] = useState('');

    const [seePassword, setSeePassword] = useState(false);
    const [seeIcon, setSeeIcon] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        loadCaptchaEnginge(8);
    }, [])

    const handlePasswordChange = (event) => {
        setSeeIcon(false)
        if (event.target.value) {
            setSeeIcon(true)
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMsg('');

        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        const captcha = form.captcha.value;

        if (!email || !password || !captcha) {
            setErrorMsg('All fields are required');
            return;
        }

        if (validateCaptcha(captcha) == true) {
            signInUser(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user)
                    form.reset();
                    if (location.state) {
                        navigate(location.state)
                    }
                    else {
                        navigate('/');
                    }
                })
                .catch((error) => {
                    setErrorMsg('Invalid Email or Password')
                });
        }
        else {
            setErrorMsg('Captcha Does Not Match');
        }
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | LogIn</title>
                <link rel="canonical" href="" />
            </Helmet>

            <div className='lg:max-w-7xl lg:mx-auto lg:space-y-10'>

                <div className="hero bg-logIn-pattern min-h-screen">

                    <div className={`bg-logIn-pattern lg:w-5/6 h-5/6 lg:flex justify-center items-center shadow-[5px_10px_10px_5px_rgba(0,0,0,0.3)] px-10`}>

                        {/* Left Side */}
                        <div>
                            <img src={img1} />
                        </div>

                        {/* Right Side (Form) */}
                        <div className="lg:w-2/4">
                            <p className="text-3xl font-bold text-center mt-6">Log In</p>

                            <form onSubmit={handleLogin} className="card-body">

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

                                <div className="form-control space-y-3">
                                    <label className='label'>
                                        <p className="label-text font-bold block">Captcha</p>
                                    </label>
                                    <div>
                                        <LoadCanvasTemplate />
                                    </div>
                                    <input type="text" name="captcha" placeholder="Type Captcha" className="input input-bordered" />
                                </div>
                                <p className="text-red-500 text-center">{errorMsg}</p>

                                <div className="form-control mt-3">
                                    <button className="btn bg-[#D1A054] text-white">
                                        <input type="submit" value="Sign In" />
                                    </button>
                                </div>
                            </form>

                            <div className="text-center space-y-2">
                                <p className="text-[#D1A054]">New here? <Link to='/signup'><span className="font-bold hover:underline">Create a New Account</span></Link></p>
                            </div>

                            <div className="space-y-5 my-7 text-center">
                                <p>Or Sign In with</p>
                                <OtherLoginBtns></OtherLoginBtns>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;