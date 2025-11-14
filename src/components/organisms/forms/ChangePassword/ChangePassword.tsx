import { apiChangePassword } from "@apis/user";
import { Input } from "@components/atoms/Input/Input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type PasswordField = "current" | "new" | "confirm";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<PasswordField, string>>({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState<Record<PasswordField, string>>({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (key: PasswordField, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const trimmed = {
      current: formData.current.trim(),
      new: formData.new.trim(),
      confirm: formData.confirm.trim(),
    };

    const validationErrors: Record<PasswordField, string> = {
      current: "",
      new: "",
      confirm: "",
    };

    let isValid = true;

    if (!trimmed.current) {
      validationErrors.current = "Current password is required";
      isValid = false;
    }

    if (trimmed.new.length < 8) {
      validationErrors.new = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/[A-Z]/.test(trimmed.new)) {
      validationErrors.new =
        "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/[a-z]/.test(trimmed.new)) {
      validationErrors.new =
        "Password must contain at least one lowercase letter";
      isValid = false;
    } else if (!/[0-9]/.test(trimmed.new)) {
      validationErrors.new = "Password must contain at least one number";
      isValid = false;
    } else if (!/[\W_]/.test(trimmed.new)) {
      validationErrors.new =
        "Password must contain at least one special character";
      isValid = false;
    }

    if (!trimmed.confirm) {
      validationErrors.confirm = "Confirm password is required";
      isValid = false;
    } else if (trimmed.new !== trimmed.confirm) {
      validationErrors.confirm = "Passwords do not match";
      isValid = false;
    }

    return { isValid, errors: validationErrors, trimmed };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors, trimmed } = validateForm();
    setErrors(validationErrors);

    if (!isValid) return;
    setLoading(true);
    try {
      await apiChangePassword({
        currentPassword: trimmed.current,
        newPassword: trimmed.new,
        confirmPassword: trimmed.confirm,
      });

      toast.success("Password changed successfully");
      setFormData({ current: "", new: "", confirm: "" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 sm:mx-10 mb-8 bg-[#1c1f29] text-white rounded-2xl shadow-lg p-4 sm:p-6 quicksand-font flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-white">
        <span className="text-yellow-400">Change</span> Password
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="current-password"
          label="Current Password"
          type="password"
          placeholder="Enter Current Password"
          value={formData.current}
          onChange={(e) => handleChange("current", e.target.value)}
          error={errors.current}
          className="w-full text-center bg-transparent border border-yellow-400 text-white placeholder-gray-400 rounded-md py-2 px-4 focus:outline-none"
        />

        <Input
          id="new-password"
          label="New Password"
          type="password"
          placeholder="Enter New Password"
          value={formData.new}
          onChange={(e) => handleChange("new", e.target.value)}
          error={errors.new}
          className="w-full text-center bg-transparent border border-yellow-400 text-white placeholder-gray-400 rounded-md py-2 px-4 focus:outline-none"
        />
      </div>

      <Input
        id="confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirm}
        onChange={(e) => handleChange("confirm", e.target.value)}
        error={errors.confirm}
        className="w-full text-center bg-transparent border border-yellow-400 text-white placeholder-gray-400 rounded-md py-2 px-4 focus:outline-none"
      />

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          aria-disabled={loading}
          className={`w-44 flex items-center justify-center gap-2 bg-gradient-to-r 
    from-yellow-400 via-yellow-200 to-yellow-400 
    hover:from-yellow-500 text-black font-semibold py-2 rounded-full mt-3 
    transition-all duration-200 
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Updating...</span>
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
