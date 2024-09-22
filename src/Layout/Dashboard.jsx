import { Link, Outlet } from "react-router-dom";
import LeftNavbar from "../Pages/Dashboard/LeftNavbar/LeftNavbar";
import { FaBook, FaCalendarAlt, FaHome, FaShoppingBag, FaShoppingCart, FaUsers, FaWallet } from "react-icons/fa";
import { MdEmail, MdReviews } from "react-icons/md";
import { TbCalendarShare } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { TfiMenuAlt } from "react-icons/tfi";
import useAdmin from "../CustomHooks/useAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className='flex bg-[#F3F3F3]'>
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
                <link rel="canonical" href="" />
            </Helmet>

            <div className='bg-[#D1A054] w-fit min-h-screen p-10 space-y-10'>
                <Link to='/'>
                    <div className="font-cinzel font-extrabold">
                        <h1 className="text-2xl">BISTRO BOSS</h1>
                        <h1 className="text-base tracking-[0.40em]">RESTAURANT</h1>
                    </div>
                </Link>


                <div>
                    {
                        isAdmin ? <ul className="w-fit flex flex-col items-start uppercase space-y-5 border-b-2 pb-10">
                            {
                                <LeftNavbar linkIcon={<FaHome />} linkName={'Admin Home'} linkTo={'/dashboard/adminHome'}></LeftNavbar>
                            }
                            {
                                <LeftNavbar linkIcon={<ImSpoonKnife />} linkName={'Add Items'} linkTo={'/dashboard/addItems'}></LeftNavbar>
                            }
                            {
                                <LeftNavbar linkIcon={<TfiMenuAlt />} linkName={'Manage Items'} linkTo={'/dashboard/manageItems'}></LeftNavbar>
                            }
                            {
                                <LeftNavbar linkIcon={<FaBook />} linkName={'Manage Bookings'} linkTo={'/'}></LeftNavbar>
                            }
                            {
                                <LeftNavbar linkIcon={<FaUsers />} linkName={'All Users'} linkTo={'/dashboard/allusers'}></LeftNavbar>
                            }

                        </ul> :
                            <ul className="flex flex-col items-start uppercase space-y-5 border-b-2 pb-10">
                                {
                                    <LeftNavbar linkIcon={<FaHome />} linkName={'User Home'} linkTo={'/dashboard/userHome'}></LeftNavbar>
                                }
                                {
                                    <LeftNavbar linkIcon={<FaCalendarAlt />} linkName={'reservation'} linkTo={'/res'}></LeftNavbar>
                                }
                                {
                                    <LeftNavbar linkIcon={<FaWallet />} linkName={'Payment History'} linkTo={'/dashboard/paymentHistory'}></LeftNavbar>
                                }
                                {
                                    <LeftNavbar linkIcon={<FaShoppingCart />} linkName={'My Cart'} linkTo={'/dashboard/cart'}></LeftNavbar>
                                }
                                {
                                    <LeftNavbar linkIcon={<MdReviews />} linkName={'Add Review'} linkTo={'/pay'}></LeftNavbar>
                                }
                                {
                                    <LeftNavbar linkIcon={<TbCalendarShare />} linkName={'My Booking'} linkTo={'/pay'}></LeftNavbar>
                                }
                            </ul>
                    }

                    <ul className="flex flex-col items-start uppercase space-y-5 pt-10">
                        {
                            <LeftNavbar linkIcon={<FaHome />} linkName={'Home'} linkTo={'/'}></LeftNavbar>
                        }
                        {
                            <LeftNavbar linkIcon={<GiHamburgerMenu />} linkName={'Menu'} linkTo={'/ourmenu'}></LeftNavbar>
                        }
                        {
                            <LeftNavbar linkIcon={<FaShoppingBag />} linkName={'Shop'} linkTo={'/ourshop/salad'}></LeftNavbar>
                        }
                        {
                            <LeftNavbar linkIcon={<MdEmail />} linkName={'Contact'} linkTo={'/contactUs'}></LeftNavbar>
                        }
                    </ul>

                </div>
            </div>

            <div className="w-full p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;