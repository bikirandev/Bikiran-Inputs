import { FC, useEffect, useRef, useState } from "react";
import {
  TAnimateInputField,
  TInputChangeEvent,
} from "../../lib/types/InputType";
import { cn } from "../../lib/utils/cn";

// InputField component with TS types
const EmailInputField: FC<TAnimateInputField> = (props) => {
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const {
    label,
    type = "text",
    autoComplete = "off",
    name,
    formData,
    onBlur,
    className = "",
    disabled = false,
    required = false,
    onChange,
    readOnly,
  } = props;

  const handleFocus = () => {
    if (!disabled && ref.current) {
      ref.current.focus();
      setFocused(true);
    }
  };

  const handleBlur = () => {
    if (ref.current) {
      setFocused(false);
    }
  };
  const handleChange = (ev: TInputChangeEvent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (ref.current) {
      ref.current.value = ref.current.value.trim();
      if (!emailRegex.test(ref.current.value)) {
        ref.current.setCustomValidity("Please enter a valid email address.");
      } else {
        ref.current.setCustomValidity("");
      }
    }
    onChange && onChange(ev);
  };

  // Focus the input when `focused` is set to true
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  const inputValue = formData[name] ?? "";
  const isValue = inputValue !== "";

  return (
    <div className="animate-input w-full">
      <div
        className={cn("w-full h-[45px] relative overflow-visible", className)}
        onClick={handleFocus}
      >
        <label
          className={cn(
            "text-sm font-medium text-primary-300 leading-5 px-1 bg-white absolute top-1/2 left-[10px] -translate-y-1/2 transition-all duration-300 focus:bg-white z-10",
            {
              "-top-[10px] left-4 translate-x-0 translate-y-0":
                focused || isValue,
              "text-secondary-700": focused,
              "text-primary": isValue && !focused,
            }
          )}
        >
          {label || "Type something"}
          {required && <span className="text-error opacity-75">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          required={required}
          name={name}
          value={inputValue}
          onChange={handleChange}
          onBlur={onBlur || handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            "block w-full h-full px-[10px] caret-white border rounded-[8px] text-base outline-none disabled:grayscale transition-colors",
            {
              "border-secondary-700 caret-current": focused,
              "border-primary": isValue && !focused,
            }
          )}
        />
      </div>
    </div>
  );
};
export default EmailInputField;
