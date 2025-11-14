import { apiGoogleLogin, apiSignup } from "@apis/auth";
import { BgButton, BgInput, Image } from "@components/atoms";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiGetUser } from "../../../../apis/user";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  referalCode?: string;
  adsBy?: string;
}

interface SimpleSignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupModal = ({
  isOpen,
  onClose,
  referalCode,
  adsBy,
}: SignupModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SimpleSignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Please confirm your password";
        } else if (value !== formData.password) {
          errors.confirmPassword = "Passwords do not match";
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

    // Special case: if updating password, also re-validate confirmPassword
    if (field === "password" && formData.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      if (confirmError) {
        setFieldErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
      } else {
        setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const errors: { [key: string]: string } = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(
        field as keyof SimpleSignupFormData,
        formData[field as keyof SimpleSignupFormData]
      );
      if (error) {
        errors[field] = error;
      }
    });

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        userName: formData.username,
        email: formData.email.toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        referalCode: referalCode || "",
        adsBy: adsBy || "",
      };

      const response = await apiSignup(userData);

      if (response.success) {
        toast.success("Account created successfully!");
        onClose();
        navigate("/login");
      } else {
        toast.error(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/?login=true");
    onClose();
  };

  const handleClose = () => {
    navigate("/");
    onClose();
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      await apiGoogleLogin(credentialResponse.credential, "", adsBy || "");
      const res = await apiGetUser();
      if (!res) {
        // dispatch(setAuthStatusProfileInComplete());
      } else {
        const needProfileUpdate =
          !res.address?.trim() ||
          !res.city?.trim() ||
          !res.state?.trim() ||
          !res.zip?.trim() ||
          !res.birthday?.trim() ||
          !res.phone?.trim();

        // dispatch(updateUser(res));

        if (needProfileUpdate) {
          // 🚨 Don't navigate, just open modal
          // dispatch(setAuthStatusProfileInComplete());
        } else {
          // await apiGetWallet();
          // await apiGetActivity();
          // dispatch(setAuthStatusSuccess());
          // navigate("/homedashboard"); // ✅ only navigate when profile is complete
        }
        navigate("/homedashboard"); // ✅ only navigate when profile is complete
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Google Authentication failed. Please try again.", {
        id: "google",
      });
    }
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
          className="border-[1px] border-[rgba(200,200,200,0.3)] rounded-lg p-6 w-full max-w-md relative shadow-[0_0_3px_1px_rgba(250,250,250,0.1)] shadow-inner-[0_3px_3px_4px_rgba(100,100,100,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={handleClose}
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">Join us today!</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
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
                className="h-12 w-full"
                error={fieldErrors.email}
              />
            </div>

            <div className="mb-6">
              <h1 className="text-white text-[12px]">PASSWORD</h1>
              <BgInput
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="h-12 w-full"
                error={fieldErrors.password}
              />
            </div>

            <div className="mb-6">
              <h1 className="text-white text-[12px]">CONFIRM PASSWORD</h1>
              <BgInput
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData("confirmPassword", e.target.value)
                }
                className="h-12 w-full"
                error={fieldErrors.confirmPassword}
              />
            </div>

            <BgButton
              type="submit"
              onClick={() => {}}
              loading={isLoading}
              className="w-full h-12 md:h-14"
              disabled={isLoading}
              size="authentication"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </BgButton>
          </form>

          <div className="text-center mt-3">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={handleLogin}
                className="text-yellow-500 hover:text-yellow-400 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>

          {/* Social login wooden-style button */}
          <div className="relative mt-6 flex justify-center">
            <div className="relative group w-full cursor-pointer">
              {/* Wooden background */}
              <Image
                src="/assets/images/buttons/button_bg_authentication.webp" // use your wooden button image (replace with correct path)
                alt="Google button background"
                className="absolute inset-0 w-full object-cover"
              />

              {/* Overlay hover glow */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              {/* Text and icon */}
              <div className="relative z-10 mt-1 sm:mt-2 flex items-center justify-center gap-2 h-full text-[#E6D8A3] font-semibold">
                <span className="text-lg font-bold">G</span>
                <span className="text-sm">Google</span>
              </div>

              {/* Invisible Google Login overlay */}
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleLogin(credentialResponse)
                }
                onError={() => {
                  toast.error("Error logging in...");
                }}
                useOneTap={false}
                theme="filled_black"
                size="large"
                text="signin"
                shape="rectangular"
                width="100%"
                containerProps={{
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    pointerEvents: "all",
                    zIndex: 30,
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
