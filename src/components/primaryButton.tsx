export default function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary-70 text-white px-6 py-3 rounded-2xl hover:bg-primary-90 transition-colors cursor-pointer w-full">
      {children}
    </button>
  );
}