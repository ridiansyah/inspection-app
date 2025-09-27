import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options?: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: FieldError;
}

const Select: React.FC<Props> = ({
  options = [],
  placeholder = "Select Options",
  searchPlaceholder = "Search...",
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className="w-full mx-auto mt-1">
      {/* Select Container */}
      <div className="relative" ref={dropdownRef}>
        {/* Main Select Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className={`w-full bg-white border rounded-lg py-2 px-3 text-left focus:outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer text-sm ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-200 focus:border-gray-400"
          }`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {/* Search Box */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-gray-700"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full cursor-pointer text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                      selectedValue === option.value
                        ? "bg-teal-100 text-teal-600 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Not Found...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs text-red-500">
          {error?.message || "Something's wrong here"}
        </span>
      )}
    </div>
  );
};

export default Select;
