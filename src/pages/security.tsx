import Navbar from "../components/navbar"
import { useNavigate } from "react-router-dom";

export default function Security(){
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="flex w-screen h-screen items-start justify-center mt-12">
                <div className="flex flex-col gap-6 pt-10 px-6 sm:px-12 pb-10 bg-white rounded-2xl shadow-none sm:shadow-sm sm:border sm:border-gray-100 border-none w-full max-w-xl mx-auto mt-10">
                    <div className="flex flex-row items-center w-full relative">
                        <button 
                            onClick={() => navigate("/setting")}
                            className="flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 cursor-pointer absolute left-0 z-10"
                        >
                            <i className="bi bi-chevron-left text-xl text-primary-50"></i>
                            <span className="text-lg font-base text-primary-50">กลับ</span>
                        </button>
                        <h1 className="text-xl  text-gray-800 text-center w-full">ตั้งค่าความปลอดภัย</h1>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => navigate("/change-password")}
                            className="flex flex-row justify-between items-center w-full py-4 px-4 rounded-2xl bg-highlight-20 text-gray-50 hover:bg-highlight-40 transition-colors cursor-pointer">
                            <p className="text-start">เปลี่ยนรหัสผ่าน</p>
                            <i className="bi bi-chevron-right text-xl text-primary-50"></i>
                        </button>
                        <button className="flex flex-row justify-between items-center w-full py-4 px-4 rounded-2xl bg-highlight-20 text-gray-50 hover:bg-highlight-40 transition-colors cursor-pointer">
                            <p className="text-start">ลบบัญชี</p>
                            <i className="bi bi-chevron-right text-xl text-primary-50"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}