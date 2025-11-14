import { apiResetPassword } from "@apis/auth";
import { ResetPasswordFormData, validateResetPasswordForm } from "@app-utils/forms/resetPasswordValidation";
import FLButton from "@components/atoms/FLButton/FLButton";
import { Input } from "@components/atoms/Input/Input";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface ResetPasswordModalProps {
  token: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordModal = ({ token, isOpen, onClose }: ResetPasswordModalProps) => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const updateFormData = (field: keyof ResetPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full p-3 rounded-md bg-[#1f2230] border border-yellow-500 text-gray-400 placeholder-gray-500 text-center focus:outline-none focus:border-yellow-500";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const errors = validateResetPasswordForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      const data = {
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };
      await apiResetPassword(data);
      toast.success("Password reset successfully.");
      onClose();
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to reset password. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="forgot-modal"
          className="fixed inset-0 z-50 bg-black flex items-center justify-center quicksand-font"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#12131C] text-white rounded-lg w-full max-w-md mx-4 p-6 shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-xl hover:text-yellow-400"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center mx-2 sm:mx-4">
              <img
                src="/assets/images/favicon.webp"
                alt="logo"
                className="h-60 w-60 object-contain mt-5"
              />
            </div>

            <h2 className="text-xl font-semibold text-center mb-2 mt-4">
              Create A New Password
            </h2>
            {/* Inputs */}
            <div className="mt-6">
              {[
                {
                  id: "newPassword",
                  label: "New Password",
                  value: formData.newPassword,
                  field: "newPassword" as keyof ResetPasswordFormData,
                  type: "password",
                },
                {
                  id: "confirmPassword",
                  label: "Confirm Password",
                  value: formData.confirmPassword,
                  field: "confirmPassword" as keyof ResetPasswordFormData,
                  type: "password",
                },
              ].map(({ id, label, value, field, type = "text" }) => (
                <Input
                  key={id}
                  id={id}
                  label={label}
                  type={type}
                  value={value}
                  onChange={(e) => updateFormData(field, e.target.value)}
                  placeholder={label}
                  error={fieldErrors[id]}
                  className={inputClass}
                />
              ))}
              <FLButton
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 hover:from-yellow-500 text-black font-semibold py-2 rounded-md mt-3"
                loading={loading}
              >
                Create a new password
              </FLButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

