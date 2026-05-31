import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import DangerButton from "../components/dangerButton";
import { showConfirmDelete, showError, showSuccess } from "../utils/alert";

export default function DeleteAccount() {
    const navigate = useNavigate();
    const handleDeleteAccount = async () => {
        const result = await showConfirmDelete();

        if (!result.isConfirmed) return;

        try {
            // await userAPI.deleteAccount();

            showSuccess(
                "ลบบัญชีสำเร็จ",
                "บัญชีของคุณถูกลบเรียบร้อยแล้ว"
            );

            navigate("/login");
        } catch {
            showError(
                "ลบบัญชีไม่สำเร็จ",
                "กรุณาลองใหม่อีกครั้ง"
            );
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex w-screen h-screen items-start justify-center mt-12">
                <div className="flex flex-col gap-6 pt-10 px-6 sm:px-12 pb-10 bg-white rounded-2xl shadow-none sm:shadow-sm sm:border sm:border-gray-100 border-none w-full max-w-xl mx-auto mt-10">
                    <div className="flex flex-row items-center w-full relative">
                        <button 
                            onClick={() => navigate("/security")}
                            className="flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 cursor-pointer absolute left-0 z-10"
                        >
                            <i className="bi bi-chevron-left text-xl text-primary-50"></i>
                            <span className="text-lg font-base text-primary-50">กลับ</span>
                        </button>
                        <h1 className="text-xl  text-gray-800 text-center w-full">ลบบัญชี</h1>
                    </div>
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex flex-col items-center gap-1">
                            <i className="bi bi-exclamation-circle-fill text-primary-40 text-6xl mb-4"></i>
                            <p className="text-center text-wrap">
                                บัญชีของคุณจะถูกลบอย่างถาวรและไม่สามารถกู้คืนได้ ข้อมูลทั้งหมดของคุณจะหายไป รวมถึงข้อมูลรายรับ-รายจ่ายและการตั้งค่าต่าง ๆ
                            </p>
                        </div>

                        <DangerButton onClick={handleDeleteAccount}>
                           ดำเนินการต่อ
                        </DangerButton>
                    </div>
                </div>
            </div>
        </>
    )
}