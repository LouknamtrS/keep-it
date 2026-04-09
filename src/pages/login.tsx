import logo from '../assets/keep_it_logo.png';
import PrimaryButton from '../components/primaryButton';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

type FormErrors = FormData;

type FormField = keyof FormData;

const initialForm: FormData = {
  email: '',
  password: '',
};

const initialErrors: FormErrors = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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

    if (!emailRegex.test(data.email)) {
      newErrors.email = 'อีเมลไม่ถูกต้อง';
    }

    if (!data.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
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

      //console.log('Login success:', formData);

      setFormData(initialForm);

    } catch (error) {
      console.error(error);
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
    { id: "email", label: "อีเมล", type: "email", placeHolder: "อีเมลของคุณ", icon: "bi-envelope" },
    { id: "password", label: "รหัสผ่าน", type: "password", placeHolder: "รหัสผ่านของคุณ", icon: "bi-key" },
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
            <h2 className="text-lg font-normal">เข้าสู่ระบบ</h2>

            <div className='flex flex-col gap-6 w-full items-center'>
              <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                {fields.map((field) => {
                const isPassword = field.id === "password";

                const inputType =
                    isPassword
                    ? showPassword ? "text" : "password"
                    : field.type;

                return (
                    <div key={field.id} className="flex flex-col w-full items-start gap-1">
                    <label
                        htmlFor={field.id}
                        className="pl-4 text-primary-70 text-sm"
                    >
                        {field.label}
                    </label>

                    {/* Input Wrapper */}
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

                        {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50 hover:text-primary-60 text-lg"
                        >
                            <i
                            className={`bi ${
                                showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
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
                    {isPassword && (
                        <div className="w-full text-right pr-2">
                        <a href="/forgot-password" className="text-sm text-primary-70 hover:underline">
                            ลืมรหัสผ่าน?
                        </a>
                        </div>
                    )}
                    </div>
                );
                })}

                <div className="pt-4">
                  <PrimaryButton>
                    {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                  </PrimaryButton>
                </div>

              </form>

              <div className="text-sm text-gray-500">
                ยังไม่เคยมีบัญชีมาก่อนใช่ไหม?{' '}
                <a href="/register" className="text-primary-70 hover:underline">
                  สร้างบัญชี
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}