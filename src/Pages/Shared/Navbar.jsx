import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../../CustomHooks/useAuth";
import useCart from "../../CustomHooks/useCart";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const [cart] = useCart();
    // console.log(cart)

    const handleSignOut = () => {
        signOutUser();
    }

    const links = <>
        <li>
            <NavLink
                to="/"
                style={({ isActive }) => {
                    return {
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        color: isActive ? "#EEFF25" : "white",
                    };
                }}
            >
                Home
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/contactUs"
                style={({ isActive }) => {
                    return {
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        color: isActive ? "#EEFF25" : "white",
                    };
                }}
            >
                Contact Us
            </NavLink>
        </li>

        {
            user ? <li>
                <NavLink
                    to="/dashboard"
                    style={({ isActive }) => {
                        return {
                            fontWeight: "bold",
                            backgroundColor: "transparent",
                            color: isActive ? "#EEFF25" : "white",
                        };
                    }}
                >
                    Dashboard
                </NavLink>
            </li> : ""
        }


        <li>
            <NavLink
                to="/ourmenu"
                style={({ isActive }) => {
                    return {
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        color: isActive ? "#EEFF25" : "white",
                    };
                }}
            >
                Our Menu
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/ourshop/salad"
                style={({ isActive }) => {
                    return {
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        color: isActive ? "#EEFF25" : "white",
                    };
                }}
            >
                Our Shop
            </NavLink>
        </li>

        <li>
            {
                user ?
                    <div className="flex items-center lg:flex-row flex-col gap-x-5 hover:bg-transparent">
                        <NavLink to='/dashboard/cart'>
                            <button className="btn bg-transparent hover:bg-transparent relative border-none mr-5">
                                <FaShoppingCart className="text-3xl text-white" />
                                <div className="badge badge-secondary w-10 absolute -right-4">{cart.length <= 10 ? cart.length : 10 + '+'}</div>
                            </button>
                        </NavLink>

                        <NavLink
                            onClick={handleSignOut}
                            style={() => {
                                return {
                                    fontWeight: "bolder",
                                    backgroundColor: "transparent",
                                    color: "red",
                                };
                            }}
                        >
                            Sign Out
                        </NavLink>

                        <NavLink
                            to="/dashboard"
                            style={() => {
                                return {
                                    fontWeight: "bold",
                                    backgroundColor: "transparent",
                                };
                            }}
                        >
                            <img src={user?.photoURL} className="w-10 h-10 rounded-full" alt="" />
                        </NavLink>
                    </div>
                    : <NavLink
                        to="/login"
                        style={({ isActive }) => {
                            return {
                                fontWeight: "bold",
                                backgroundColor: "red",
                                color: isActive ? "#EEFF25" : "white",
                                marginLeft: '10px'
                            };
                        }}
                    >
                        LogIn
                    </NavLink>
            }

        </li>

    </>
    return (
        <div>
            <div className="navbar md:fixed z-10 bg-black text-white md:bg-opacity-50 px-14">
                <div className="navbar-start w-fit">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg uppercase">
                            {
                                links
                            }
                        </ul>
                    </div>

                    <Link to='/'>
                        <div className="font-cinzel">
                            <h1 className="text-3xl font-bold">BISTRO BOSS</h1>
                            <h1 className="text-xl font-bold tracking-[0.37em]">RESTAURANT</h1>
                        </div>
                    </Link>

                </div>

                <div className="w-full hidden lg:flex justify-end">
                    <ul className="menu menu-horizontal px-1 flex items-center text-lg uppercase">
                        {
                            links
                        }
                    </ul>

                </div>

            </div>
        </div>
    );
};

export default Navbar;