export default function DangerButton({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button 
      className="bg-error-30 text-white px-6 py-3 rounded-2xl hover:bg-error-60 transition-colors cursor-pointer w-full"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}