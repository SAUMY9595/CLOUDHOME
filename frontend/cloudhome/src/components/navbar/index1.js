import "./styles.css";
import { useDispatch } from "react-redux";
import { appLogout } from "../../store/slices/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(appLogout());
    };

    return (
        <div className="navbar-container">
            <div className="navbar-left-items">
            <img src="/assets/logo.png" alt="Cloud Home Logo" />
                <h3>Cloud Home</h3>
            </div>
            <div className="navbar-center-items">
                <input type="text" placeholder="Search in Cloud Home" />
            </div>
            <div className="navbar-right-items">
                <button onClick={handleLogout}>Logout</button>
                <img src="/assets/user-avatar.png" alt="User Avatar" />
            </div>
        </div>
    );
};

export default Navbar;