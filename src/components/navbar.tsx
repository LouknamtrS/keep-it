import { useNavigate } from "react-router-dom";
import logo from "../assets/keep_it_logo.png";
import mock_profile from "../assets/mock_profile.png";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="bg-bg-white w-screen h-18 p-4 flex items-center justify-between flex-row shadow-md">
            <div className="h-12 w-12">
                <img src={logo} alt="Logo" className="h-full w-full object-cover rounded-md"/>
            </div>
            <div className="h-12 w-12 cursor-pointer" onClick={() => navigate("/account")}>
                <img src={mock_profile} alt="Profile" className="h-full w-full object-cover rounded-full"/>
            </div>
        </div>
    )
}
