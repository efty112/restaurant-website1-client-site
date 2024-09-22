import { NavLink } from "react-router-dom";

const LeftNavbar = ({ linkIcon, linkName, linkTo }) => {
    return (
        <div>
            <li>
                <NavLink
                    to={linkTo}
                    className='font-cinzel'
                    style={({ isActive }) => {
                        return {
                            fontWeight: "bold",
                            backgroundColor: "transparent",
                            color: isActive ? "white" : 'black',
                        };
                    }}
                >
                    <div className="text-xl flex items-center justify-center gap-3">
                        {linkIcon}
                        {linkName}
                    </div>

                </NavLink>
            </li>
        </div>
    );
};

export default LeftNavbar;