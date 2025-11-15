import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import toast from "react-hot-toast";
import { apiUpdateUser } from "@apis/user";
import { BgButton, BgInput } from "@components/atoms";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimpleSignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const EditProfile = ({ isOpen, onClose }: SignupModalProps) => {
  const [formData, setFormData] = useState<SimpleSignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const validateField = (field: keyof SimpleSignupFormData, value: string) => {
    const errors: { [key: string]: string } = {};

    switch (field) {
      case "username":
        if (!value.trim()) {
          errors.username = "Username is required";
        } else if (value.length < 3) {
          errors.username = "Username must be at least 3 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        }
        break;
    }

    return errors[field] || "";
  };

  const updateFormData = (field: keyof SimpleSignupFormData, value: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate the field in real-time
    const error = validateField(field, value);
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleUpdate = async () => {
    try {
      await apiUpdateUser(formData.username, formData.email);
      toast.success("User Profile Updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to Update Profile!");
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="quicksand-font bg-black  bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/logback.webp')] fixed inset-0  flex items-center justify-center z-150 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={handleClose}
          >
            ✕
          </button>

          <div className="text-center mb-6 flex justify-start">
            <h2 className="text-2xl text-white mb-2 text-[24px] font-vastagoRegular">
              User Information ---------------------------
            </h2>
          </div>

          <form onSubmit={handleUpdate} className="space-y-8">
            <div>
              <h1 className="text-white text-[12px]">USER NAME</h1>
              <BgInput
                type="name"
                placeholder="Enter your name"
                value={formData.username}
                onChange={(e) => updateFormData("username", e.target.value)}
                className="h-12 w-full"
                error={fieldErrors.username}
              />
            </div>

            <div>
              <h1 className="text-white text-[12px]">EMAIL ADDRESS</h1>
              <BgInput
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={"h-12 w-full"}
                error={fieldErrors.email}
              />
            </div>

            <div className="flex flex-row justify-start mt-8 mb-3 md:text-xl">
              <BgButton
                size="cards"
                className="w-[45%] h-10 bg-gradient-to-b from-[#F89F17] to-[#925E0E] text-[white] font-vastagoSemiBold"
                onClick={handleUpdate}
              >
                SAVE USER INFO
              </BgButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
