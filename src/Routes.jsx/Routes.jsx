import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/Contact Us/ContactUs";
import OurMenu from "../Pages/Our Menu/OurMenu";
import OurShop from "../Pages/Our Shop/OurShop";
import Login from "../Pages/Login and SignUp/Login";
import SignUp from "../Pages/Login and SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "contactUs",
                element: <ContactUs></ContactUs>,
            },
            {
                path: "ourmenu",
                element: <OurMenu></OurMenu>,
            },
            {
                path: "ourshop/:category",
                element: <OurShop></OurShop>,
            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <SignUp></SignUp>,
            },

        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "userHome",
                element: <UserHome></UserHome>
            },

            // Admin Routes
            {
                path: "allusers",
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: "addItems",
                element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
            },
            {
                path: "manageItems",
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: "adminHome",
                element: <AdminRoutes> <AdminHome></AdminHome> </AdminRoutes>
            },
            {
                path: "updateItem/:id",
                element: <AdminRoutes> <UpdateItem></UpdateItem> </AdminRoutes>,
                loader: ({params}) => fetch(`https://bistro-boss-server-five-rho.vercel.app/menu/${params.id}`)
            },

        ]
    }
]);

export default router;