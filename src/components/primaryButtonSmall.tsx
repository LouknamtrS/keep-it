export default function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button 
      className="bg-primary-70 text-white px-4 py-2 text-sm rounded-2xl hover:bg-primary-90 transition-colors cursor-pointer w-full"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}