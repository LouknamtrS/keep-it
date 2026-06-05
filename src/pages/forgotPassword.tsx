import { useState } from "react";
import logo from "../assets/keep_it_logo.png";
import PrimaryButton from "../components/primaryButton";
import { showSuccess, showError } from "../utils/alert";
import { authAPI } from "../api/authAPI";

type FormData = {
  password: string;
  confirmPassword: string;
};

type FormErrors = FormData;

type FormField = keyof FormData;

const initialForm: FormData = {
  password: "",
  confirmPassword: "",
};
const initialErrors: FormErrors = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
        name: FormField;
        value: string;
    };

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = { ...initialErrors };

        if (!formData.password) {
            newErrors.password = "กรุณากรอกรหัสผ่าน";
        } else if (formData.password.length < 8) {
            newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        const hasError = Object.values(validationErrors).some(Boolean);

        setErrors(validationErrors);

        if (hasError) return;

        try {
            setIsSubmitting(true);

            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = await authAPI.resetPassword(formData.confirmPassword);

            await showSuccess(
            "เปลี่ยนรหัสผ่านสำเร็จ",
            "คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว"
            );

            setFormData(initialForm);
            setErrors(initialErrors);

        } catch {
            await showError("เกิดข้อผิดพลาด", "กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <main className="flex items-center justify-center md:bg-primary-20 w-screen min-h-screen">
      <div className="md:bg-white md:px-12 md:py-8 rounded-lg md:shadow-sm md:max-w-md w-full px-8 py-8">
        <div className="flex flex-col items-center gap-6 w-full">
          
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="Keep It Logo" className="h-24 rounded-lg" />
            <h1 className="text-3xl">Keep It</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="pl-4 text-primary-70 text-sm">
                รหัสผ่านใหม่
              </label>
              <div className="relative w-full">
                <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-20 rounded-2xl py-2 pl-10 pr-10 w-full focus:outline-none focus:ring focus:ring-primary-40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 text-lg"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
                </button>
              </div>
              {errors.password && (
                <p className="text-error-40 text-sm mt-1 pl-4">
                    {errors.password}
                </p>
            )}
            </div>
        
            <div className="flex flex-col items-start gap-1">
              <label className="pl-4 text-primary-70 text-sm">
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative w-full">
                <i className="bi bi-key absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border border-gray-20 rounded-2xl py-2 pl-10 pr-10 w-full focus:outline-none focus:ring focus:ring-primary-40"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 text-lg"
                >
                  <i className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error-40 text-sm mt-1 pl-4">
                    {errors.confirmPassword}
                </p>
                )}
            </div>
        
            <div className="pt-4">
                <PrimaryButton>
                {isSubmitting ? "กำลังบันทึก..." : "ยืนยันรหัสผ่าน"}
                </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}