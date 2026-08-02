"use client";
import { useEffect, useRef, useState } from "react";

interface LocalitySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Searchable dropdown: type to filter existing options, or keep typing your
// own value if what you want isn't in the list (no forced selection).
export default function LocalitySelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
}: LocalitySelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(value.toLowerCase())
  );
  const showCustomHint =
    value.trim().length > 0 &&
    !options.some((o) => o.toLowerCase() === value.trim().toLowerCase());

  return (
    <div ref={wrapRef} className="relative">
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className={
          className ||
          "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100 disabled:text-gray-500"
        }
        autoComplete="off"
      />
      {open && !disabled && (filtered.length > 0 || showCustomHint) && (
        <div className="absolute z-20 mt-1 w-full max-h-56 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 text-gray-700"
            >
              {opt}
            </button>
          ))}
          {showCustomHint && (
            <div className="px-3 py-2 text-xs text-gray-400 border-t border-gray-100">
              Not in the list? Keep typing to use “{value}” as entered.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
