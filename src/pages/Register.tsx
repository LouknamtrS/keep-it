import { authAPI } from '../api/authAPI';
import logo from '../assets/keep_it_logo.png';
import PrimaryButton from '../components/primaryButton';
import { useState } from 'react';
import { showError, showSuccess } from '../utils/alert';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = FormData;

type FormField = keyof FormData;

const initialForm: FormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const initialErrors: FormErrors = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: FormField;
      value: string;
    };

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = { ...initialErrors };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.username.trim()) {
      newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    }

    if (!emailRegex.test(data.email)) {
      newErrors.email = 'อีเมลไม่ถูกต้อง';
    }

    if (!data.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (data.password.length < 8) {
      newErrors.password = 'รหัสผ่านต้องอย่างน้อย 8 ตัว';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    const hasError = Object.values(validationErrors).some(Boolean);

    setErrors(validationErrors);

    if (hasError) return;

    try {
      setIsSubmitting(true);

      //console.log('Register success:', formData);
      showSuccess(
          "สร้างบัญชีสำเร็จ",
          "คุณสามารถเข้าสู่ระบบได้แล้ว"
      );
      setFormData(initialForm);

    } catch (error) {
        showError(
          "สร้างบัญชีไม่สำเร็จ",
          "กรุณาลองใหม่อีกครั้ง"
        );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields: {
    id: FormField;
    label: string;
    type: string;
    placeHolder: string;
    icon: string;
  }[] = [
    { id: "username", label: "ชื่อผู้ใช้", type: "text", placeHolder: "ชื่อผู้ใช้ของคุณ", icon: "bi-person" },
    { id: "email", label: "อีเมล", type: "email", placeHolder: "อีเมลของคุณ", icon: "bi-envelope" },
    { id: "password", label: "รหัสผ่าน", type: "password", placeHolder: "รหัสผ่านของคุณ", icon: "bi-key" },
    { id: "confirmPassword", label: "ยืนยันรหัสผ่าน", type: "password", placeHolder: "ยืนยันรหัสผ่านของคุณ", icon: "bi-key" },
  ];

  return (
    <main className="flex items-center justify-center md:bg-primary-20 w-screen min-h-screen">
      <div className="md:bg-white md:px-12 md:py-8 rounded-lg md:shadow-sm md:max-w-md w-full px-8 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className='flex flex-col gap-4 items-center'>
            <img src={logo} alt="Keep It Logo" className="mx-auto h-24 w-auto rounded-lg" />
            <h1 className="text-3xl">Keep It</h1>
          </div>

          <div className='flex flex-col gap-4 w-full items-center'>
            <h2 className="text-lg font-normal">สร้างบัญชี</h2>

            <div className='flex flex-col gap-6 w-full items-center'>
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">

                {fields.map((field) => {
                  const isPassword = field.id === "password";
                  const isConfirm = field.id === "confirmPassword";

                  const inputType =
                    isPassword
                      ? showPassword ? "text" : "password"
                      : isConfirm
                      ? showConfirmPassword ? "text" : "password"
                      : field.type;

                  return (
                    <div key={field.id} className="flex flex-col w-full items-start gap-0.5">
                      <label htmlFor={field.id} className="pl-4 text-primary-70 text-sm">
                        {field.label}
                      </label>

                      <div className="relative w-full">
                        <i className={`bi ${field.icon} absolute left-4 top-1/2 -translate-y-1/2 text-primary-40 text-lg`} />

                        <input
                          id={field.id}
                          name={field.id}
                          type={inputType}
                          placeholder={field.placeHolder}
                          value={formData[field.id]}
                          onChange={handleChange}
                          aria-invalid={!!errors[field.id]}
                          className="border border-gray-20 rounded-2xl py-2 pl-10 pr-10 w-full focus:outline-none focus:ring focus:ring-primary-40 focus:border-primary-40"
                        />

                        {(isPassword || isConfirm) && (
                          <button
                            type="button"
                            onClick={() =>
                              isPassword
                                ? setShowPassword(prev => !prev)
                                : setShowConfirmPassword(prev => !prev)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 hover:text-primary-60 text-lg"
                          >
                            <i
                              className={`bi ${
                                isPassword
                                  ? showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                                  : showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {errors[field.id] && (
                        <p className="text-error-40 text-sm mt-1 pl-4">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4">
                  <PrimaryButton>
                    {isSubmitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
                  </PrimaryButton>
                </div>

              </form>

              <div className="text-sm text-gray-500">
                มีบัญชีอยู่แล้วใช่ไหม?{' '}
                <a href="/login" className="text-primary-70 hover:underline">
                  เข้าสู่ระบบ
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}