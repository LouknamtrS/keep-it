import { useState } from "react";
import logo from "../assets/keep_it_logo.png";
import PrimaryButton from "../components/primaryButton";
import { showSuccess, showError } from "../utils/alert";
import { authAPI } from "../api/authAPI";

type FormData = {
  email: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordEmailPage() {
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [,setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    if (!EMAIL_REGEX.test(formData.email)) {
      setError("อีเมลไม่ถูกต้อง");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await authAPI.forgotPassword?.(formData.email);
      
      await showSuccess(
        "ส่งอีเมลสำเร็จ",
        "โปรดตรวจสอบกล่องจดหมายของคุณเพื่อรีเซ็ตรหัสผ่าน"
      );

      setEmail("");

    } catch (error) {
      await showError(
        "เกิดข้อผิดพลาด",
        "กรุณาลองใหม่อีกครั้ง"
      );    
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center md:bg-primary-20 w-screen min-h-screen">
      <div className="md:bg-white md:px-12 md:py-8 rounded-lg md:shadow-sm md:max-w-md w-full px-8 py-8">
        <div className="flex flex-col w-full items-center gap-6">
          <div className="flex flex-col gap-4 items-center">
            <img
              src={logo}
              alt="Keep It Logo"
              className="mx-auto h-24 w-auto rounded-lg"
            />
            <h1 className="text-3xl">Keep It</h1>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg text-center">ลืมรหัสผ่าน</h2>
                <p className="text-sm text-gray-40 text-center">
                  กรุณากรอกอีเมลที่คุณใช้สมัครบัญชีเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col w-full items-start gap-0.5">
                    <label
                      htmlFor="email"
                      className="pl-4 text-primary-70 text-sm"
                    >
                      อีเมล
                    </label>
                    <div className="relative w-full">
                      <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="อีเมลของคุณ"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!error}
                        className="border border-gray-20 rounded-2xl py-2 pl-10 pr-10 w-full focus:outline-none focus:ring focus:ring-primary-40 focus:border-primary-40"
                      />
                    </div>
                    {error && (
                      <p className="text-error-40 text-sm mt-1 pl-4">
                        {error}
                      </p>
                    )}
                  </div>
                  <div className="pt-2">
                    <PrimaryButton>
                      {isSubmitting ? "กำลังส่ง..." : "ยืนยันอีเมล"}
                    </PrimaryButton>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </main>
  );
}