import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import PrimaryButton from "../components/primaryButton";
import { showError, showSuccess } from "../utils/alert";

type Step =
    | "select-method"
    | "change-password"
    | "forgot-password"

type FormData = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type FormErrors = FormData;

type FormField = keyof FormData;

const initialForm: FormData = {
  oldPassword: '',
  newPassword : '',
  confirmPassword: ''
};

const initialErrors: FormErrors = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export default function ChangePassword() {
    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialForm);
    const [errors, setErrors] = useState<FormErrors>(initialErrors);

    const [step, setStep] =
        useState<Step>("select-method");

    const [isLoading, setIsLoading] =
        useState(false);

    const email = "l***@keepit.com";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target as {
            name: FormField;
            value: string;
        };

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };
    const validate = (
        data: FormData
    ): FormErrors => {
        const newErrors = {
            ...initialErrors
        };

        if (!data.oldPassword) {
            newErrors.oldPassword =
                "กรุณากรอกรหัสผ่านเดิม";
        }

        if (!data.newPassword) {
            newErrors.newPassword =
                "กรุณากรอกรหัสผ่านใหม่";
        } else if (data.newPassword.length < 8) {
            newErrors.newPassword =
                "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        }

        if (!data.confirmPassword) {
            newErrors.confirmPassword =
                "กรุณายืนยันรหัสผ่าน";
        } else if (
            data.newPassword !==
            data.confirmPassword
        ) {
            newErrors.confirmPassword =
                "รหัสผ่านไม่ตรงกัน";
        }

        return newErrors;
    };
    const handleChangePassword = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const validationErrors =
            validate(formData);

        const hasError =
            Object.values(validationErrors)
                .some(Boolean);

        setErrors(validationErrors);

        if (hasError) return;

        try {
            setIsLoading(true);

            /*
            await authAPI.changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });
            */

            showSuccess(
                "เปลี่ยนรหัสผ่านสำเร็จ",
                "รหัสผ่านของคุณได้รับการอัปเดตแล้ว"
            );

            setFormData(initialForm);

            setStep("select-method");
        } catch (error) {
            showError(
                "เกิดข้อผิดพลาด",
                "ไม่สามารถแก้ไขรหัสผ่านได้ในขณะนี้"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            setIsLoading(true);

            /*
            await api.post("/forgot-password");
            */
           showSuccess(
                "ส่งอีเมลสำเร็จ",
                "โปรดตรวจสอบอีเมลของคุณสำหรับลิงก์รีเซ็ตรหัสผ่าน"
            );
        } catch (error) {
            showError(
                "เกิดข้อผิดพลาด",
                "ไม่สามารถส่งอีเมลได้ในขณะนี้"
            );
        } finally {
            setIsLoading(false);
            
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-12">
                <div className="flex flex-col gap-6 pt-10 px-6 sm:px-12 pb-10 bg-white rounded-2xl shadow-none sm:shadow-sm sm:border sm:border-gray-100 border-none w-full max-w-xl mx-auto mt-10">
                    <div className="flex flex-row items-center w-full relative">
                        <button 
                            onClick={() => navigate("/security")}
                            className="flex items-center justify-center gap-2 text-primary-500 hover:text-primary-600 cursor-pointer absolute left-0 z-10"
                        >
                            <i className="bi bi-chevron-left text-xl text-primary-50"></i>
                            <span className="text-lg font-base text-primary-50">กลับ</span>
                        </button>
                        <h1 className="text-xl  text-gray-800 text-center w-full">ตั้งค่าความปลอดภัย</h1>
                    </div>

                    {step === "select-method" && (
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setStep("change-password")}
                                className="flex flex-row justify-between items-center w-full py-4 px-4 rounded-2xl bg-highlight-20 text-gray-50 hover:bg-highlight-40 transition-colors cursor-pointer"
                            >ฉันจำรหัสผ่านปัจจุบันได้
                            <i className="bi bi-chevron-right text-xl text-primary-50"></i>
                            </button>
                            <button
                                onClick={() =>setStep("forgot-password")}
                                className="flex flex-row justify-between items-center w-full py-4 px-4 rounded-2xl bg-highlight-20 text-gray-50 hover:bg-highlight-40 transition-colors cursor-pointer "
                            >ฉันลืมรหัสผ่าน
                            <i className="bi bi-chevron-right text-xl text-primary-50"></i>
                            </button>
                        </div>
                    )}

                    {step === "change-password" && (
                        <form
                            onSubmit={
                                handleChangePassword
                            }
                            className="flex flex-col gap-12 sm:mx-20"
                        >
                            <div className="flex flex-col gap-2 w-full">
                                 {/* รหัสผ่านเก่า */}
                                <div className="flex flex-col items-start w-full">
                                    <label className="text-sm text-primary-70 text-left pl-4">
                                        รหัสผ่านเก่า
                                    </label>
                                    <div className="relative w-full">
                                        <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />

                                        <input
                                            name="oldPassword"
                                            type={
                                                showOldPassword
                                                ? "text"
                                                : "password"
                                            }
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.oldPassword}
                                            className="border border-gray-20 rounded-2xl py-2 pl-12 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-primary-40"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowOldPassword(prev => !prev)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 hover:text-primary-60"
                                        >
                                            <i
                                                className={`bi ${
                                                    showOldPassword
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    {errors.oldPassword && (
                                    <p className="text-error-40 text-sm mt-1 pl-4">
                                        {errors.oldPassword}
                                    </p>
                                    )}
                                </div>
                                
                                {/* รหัสผ่านใหม่ */}
                                <div className="flex flex-col items-start w-full">
                                    <label className="text-sm text-primary-70 text-left pl-4">
                                        รหัสผ่านใหม่
                                    </label>

                                    <div className="relative w-full">
                                        <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />

                                        <input
                                            name="newPassword"
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.newPassword}
                                            className="border border-gray-20 rounded-2xl py-2 pl-12 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-primary-40"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(prev => !prev)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 hover:text-primary-60"
                                        >
                                            <i
                                                className={`bi ${
                                                    showNewPassword
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                    <p className="text-error-40 text-sm mt-1 pl-4">
                                        {errors.newPassword}
                                    </p>
                                )}
                                </div>
                                

                                {/* ยืนยันรหัสผ่าน */}
                                <div className="flex flex-col items-start w-full">
                                    <label className="text-sm text-primary-70 text-left pl-4">
                                        ยืนยันรหัสผ่าน
                                    </label>

                                    <div className="relative w-full">
                                        <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />

                                        <input
                                            name="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            aria-invalid={
                                                !!errors.confirmPassword
                                            }
                                            className="border border-gray-20 rounded-2xl py-2 pl-12 pr-12 w-full focus:outline-none focus:ring-1 focus:ring-primary-40"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(prev => !prev)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 hover:text-primary-60"
                                        >
                                            <i
                                                className={`bi ${
                                                    showConfirmPassword
                                                        ? "bi-eye-slash-fill"
                                                        : "bi-eye-fill"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                    <p className="text-error-40 text-sm mt-1 pl-4">
                                        {errors.confirmPassword}
                                    </p>
                                    )}
                                </div>
                                
                            </div>
                            <PrimaryButton>
                                {isLoading ? "กำลังเปลี่ยนรหัสผ่าน..." : "เปลี่ยนรหัสผ่าน"}
                            </PrimaryButton>
                        </form>
                    )}


                    {step === "forgot-password" && (
                        <div className="flex flex-col items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-center">
                                    เราสามารถส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้คุณได้ทาง
                                </p>
                                <p className="font-semibold">
                                    {email}
                                </p>
                            </div>
                            <PrimaryButton onClick={
                                    handleForgotPassword
                                } disabled={isLoading}>
                                {isLoading ? "กำลังส่ง..." : "ดำเนินการต่อ"}
                            </PrimaryButton>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}