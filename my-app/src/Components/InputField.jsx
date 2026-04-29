import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({ label, icon: Icon, error, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-bold text-slate-400 ml-1 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={`input-field ${isPassword ? "pr-20" : "pr-12"} ${
            error ? "border-rose-500 bg-rose-500/5" : ""
          }`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          {isPassword && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {Icon && (
            <Icon
              className={`transition-colors ${
                error ? "text-rose-500" : "text-slate-600 group-focus-within:text-indigo-500"
              }`}
              size={18}
            />
          )}
        </div>
      </div>
      {error && (
        <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase tracking-wider animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

