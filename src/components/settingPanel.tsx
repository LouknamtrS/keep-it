import { useNavigate } from "react-router-dom";
import { useState} from "react";
import CategoryModal from "./category/categoryModal";
import { authAPI } from "../api/authAPI";

interface SettingItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

const SettingItem = ({ icon, label, onClick, variant = "default" }: SettingItemProps) => {
  const baseStyles = "flex flex-col items-center justify-center gap-2 p-4 w-32 h-32 transition-colors cursor-pointer rounded-xl shrink-0";
  const variantStyles = variant === "danger" 
    ? "bg-secondary-30 text-gray-700 hover:opacity-90" 
    : "bg-primary-10 text-gray-700 hover:opacity-90";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      <i className={`bi ${icon} text-3xl text-primary-50`}></i>
      <span className="text-sm font-base text-center leading-tight">{label}</span>
    </button>
  );
};

export default function SettingPanel() {
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleLogout = async () => {
    try {
        await authAPI.logout();
        navigate("/login"); // หรือหน้า home
    } catch (err) {
        console.error("logout failed", err);
    }
  };

  const settings = [
    { icon: "bi-grid", label: "หมวดหมู่", onClick: () => setIsCategoryOpen(true) },
    { icon: "bi-person", label: "บัญชีผู้ใช้", onClick: () => navigate("/account") },
    { icon: "bi-shield-lock", label: "ความปลอดภัย", onClick: () => navigate("/security") },
    { icon: "bi-box-arrow-right", label: "ออกจากระบบ", onClick: handleLogout, variant: "danger" as const },
  ];

  return (
    <div className="flex flex-col gap-6 pt-10 px-6 lg:px-12 pb-10 bg-white rounded-2xl shadow-none lg:shadow-sm lg:border lg:border-gray-100 border-none w-full max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center">การตั้งค่า</h1>
        <div className="flex flex-row flex-wrap justify-center w-full gap-4">
            {settings.map((item, index) => (
                <SettingItem 
                key={index}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                variant={item.variant}
                />
            ))}
        </div>
        <CategoryModal
            isOpen={isCategoryOpen}
            onClose={() =>
                setIsCategoryOpen(false)
            }
        />
    </div>
  );
}

