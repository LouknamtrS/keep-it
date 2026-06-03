import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import mock_profile from "../assets/profile.jpeg";
import { userAPI } from "../api/userAPI";
import { useEffect, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<{ profileImage: string }>({ profileImage: mock_profile });
        useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userAPI.getProfile();

                const user = res.data.data;

                setProfile({
                    profileImage:user.profilePic || mock_profile,
                });

            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="bg-bg-white w-screen h-18 p-4 flex items-center justify-between flex-row shadow-md">
            <div className="h-12 w-12 cursor-pointer " onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" className="h-full w-full object-cover rounded-md"/>
            </div>
            <div className="h-12 w-12 cursor-pointer" onClick={() => navigate("/setting")}>
                <img src={profile.profileImage || mock_profile} alt="Profile" className="h-full w-full object-cover rounded-full"/>
            </div>
        </div>
    )
}
