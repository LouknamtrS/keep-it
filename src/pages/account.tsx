import { useState, useRef } from "react";
import Navbar from "../components/navbar";
import mock_profile from "../assets/mock_profile.png";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/alert";

export default function Account() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState({
        username: "lalune",
        email: "lalune@example.com",
        profileImage: mock_profile
    });

    const [username, setUsername] = useState(profile.username);

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const isChanged =
        username !== profile.username ||
        selectedImage !== null;

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedImage(file);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username.trim()) {
            showError(
                "ข้อมูลไม่ถูกต้อง",
                "กรุณากรอกชื่อผู้ใช้"
            );
            return;
        }
        if (!username.trim()) {
            showError(
                "ข้อมูลไม่ถูกต้อง",
                "กรุณากรอกชื่อผู้ใช้"
            );
            return;
        }

        setIsLoading(true);

        try {
            /*
            *
            * const formData = new FormData();
            * formData.append("username", username);
            *
            * if (selectedImage) {
            *     formData.append("profileImage", selectedImage);
            * }
            *
            * const response = await updateProfile(formData);
            */

            setProfile(prev => ({
                ...prev,
                username
            }));

            setSelectedImage(null);

            showSuccess(
                "แก้ไขข้อมูลสำเร็จ",
                "ข้อมูลของคุณได้รับการอัปเดตแล้ว"
            );
        } catch (error) {
            showError(
                "แก้ไขข้อมูลไม่สำเร็จ",
                "ไม่สามารถบันทึกข้อมูลได้"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex w-screen h-screen items-start justify-center mt-12">
                <div className="flex flex-col gap-6 pt-10 px-6 lg:px-12 pb-10 bg-white rounded-2xl shadow-none lg:shadow-sm lg:border lg:border-gray-100 border-none w-full max-w-xl mx-auto mt-10">

                    <div className="flex flex-row items-center w-full relative">
                        <button
                            onClick={() => navigate("/setting")}
                            className="flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 cursor-pointer absolute left-0 z-10"
                        >
                            <i className="bi bi-chevron-left text-xl text-primary-50"></i>
                            <span className="text-lg font-base text-primary-50">
                                กลับ
                            </span>
                        </button>

                        <h1 className="text-xl text-gray-800 text-center w-full">
                            การตั้งค่าบัญชีผู้ใช้
                        </h1>
                    </div>

                    <form onSubmit={handleSave} className="flex flex-col gap-4 lg:mx-20">

                        <div className="flex flex-col items-center gap-4">
                            <div className="relative h-24 w-24">

                                <img
                                    src={
                                        selectedImage
                                            ? URL.createObjectURL(selectedImage)
                                            : profile.profileImage
                                    }
                                    alt="Profile"
                                    className="h-full w-full object-cover rounded-full"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="absolute bottom-0 right-0 bg-primary-10 text-primary-50 p-2 rounded-full hover:bg-primary-60 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                                >
                                    <i className="bi bi-pencil-fill text-xs"></i>
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-primary-70 text-left pl-4">
                                ชื่อผู้ใช้
                            </label>

                            <div className="relative">
                                <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-xl"></i>

                                <input
                                    type="text"
                                    value={username}
                                    required
                                    minLength={3}
                                    maxLength={30}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="border border-gray-20 rounded-2xl py-2 pl-12 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-primary-40 text-gray-40"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-primary-70 text-left pl-4">
                                อีเมล
                            </label>

                            <div className="relative">
                                <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-xl"></i>

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="bg-gray-10 border border-gray-20 rounded-2xl py-2 pl-12 pr-4 w-full text-gray-40"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isChanged || isLoading}
                            className={`mt-6 w-full py-3 rounded-2xl transition-all duration-200 ${
                                isChanged && !isLoading
                                    ? "bg-primary-70 text-white hover:bg-primary-90 cursor-pointer"
                                    : "bg-gray-10 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {isLoading
                                ? "กำลังบันทึก..."
                                : "บันทึกการแก้ไข"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}