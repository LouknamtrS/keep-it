import { useEffect, useRef, useState } from "react";

type Option<T> = {
    label: string;
    value: T;
};

type Props<T> = {
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
};

export default function CustomDropdown<T extends string | number>({
    value,
    options,
    onChange,
}: Props<T>) {
    const [open, setOpen] = useState(false);
    const selected = options.find((option) => option.value === value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
            ){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="min-w-22 w-full bg-primary-10 rounded-xl px-3 py-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-primary-30"
            >
                <span className="flex-1 overflow-hidden whitespace-nowrap truncate text-left">{selected?.label}</span>
                <i className={`bi bi-chevron-down transition-transform ${open ? "rotate-180" : "" }`}/>
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-full bg-primary-10 rounded-xl shadow-lg  overflow-hidden">
                    {options.map((option) => (
                            <button key={option.value} type="button" onClick={() => {onChange(option.value); setOpen(false);}} className="w-full text-left px-3 py-2 hover:bg-primary-30 cursor-pointer">
                                {option.label}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}