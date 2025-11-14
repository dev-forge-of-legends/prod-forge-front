import { apiGoogleLogin, apiLogin } from "@apis/auth";
import { apiGetUser, apiGetWallet } from "@apis/user";
import {
  LoginFormData,
  validateLoginForm,
} from "@app-utils/forms/loginValidation";
import { BgButton, BgInput, Image } from "@components/atoms";
import { GoogleLogin } from "@react-oauth/google";
import { clearRedirect } from "@redux/slices/redirect.slice";
import { setUserData } from "@redux/slices/users.slice";
import { useAppSelector } from "@redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get redirect path from URL params
  const redirectPath = useAppSelector(
    (state) => state.redirect.loginRedirectUrl
  );

  // Helper function to navigate after successful login
  const navigateAfterLogin = async () => {
    if (redirectPath) {
      const userData = await apiGetUser();
      localStorage.setItem("userdata", JSON.stringify(userData));
      navigate(decodeURIComponent(redirectPath));
      dispatch(clearRedirect());
    } else {
      const userData = await apiGetUser();
      localStorage.setItem("userdata", JSON.stringify(userData));
      navigate("/homedashboard");
    }
  };

  //Send Login Data to Server
  // Update form data helper function
  const updateFormData = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    setFormData({ email: "", password: "" });
    setFieldErrors({});
    onClose();
    navigate("/?signup=true");
  };

  const handleForgot = () => {
    navigate("/reset-password");
  };

  const handleLogin = async () => {
    const errors = validateLoginForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      await apiLogin({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      setUserData(apiGetUser);

      apiGetWallet();
      onClose();
      navigateAfterLogin();
    } catch (err: any) {
      toast.error(err.message || "Login failed. Please try again.", {
        id: "login",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      await apiGoogleLogin(credentialResponse.credential, undefined, undefined);
      // await apiGetWallet();
      onClose();
      navigateAfterLogin();
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.", { id: "login" });
    }
  };

  const handleClose = () => {
    navigate("/");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black flex items-center justify-center z-150 p-4 bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/logback.webp')]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="quicksand-font border-[1px] border-[rgba(200,200,200,0.3)] shadow-[0_0_3px_1px_rgba(250,250,250,0.1)] rounded-lg p-6 w-full max-w-md relative"
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
              Welcome Forge of Legends
            </h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <h1 className="text-white text-[12px]">EMAIL ADDRESS</h1>
              <BgInput
                type="email"
                placeholder="Enter your name"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                error={fieldErrors.email}
              />
            </div>

            <div>
              <h1 className="text-white text-[12px]">PASSWORD</h1>
              <BgInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                error={fieldErrors.password}
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                <button
                  className="underline hover:text-yellow-200"
                  onClick={handleForgot}
                >
                  Forgot Password?
                </button>
              </p>
            </div>
            <div className="flex flex-row justify-center mt-3 mb-3">
              <BgButton
                type="submit"
                onClick={() => {}}
                loading={loading}
                size="authentication"
                className="w-full mt-6 h-12 md:h-12"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </BgButton>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <button
                  className="underline hover:text-yellow-200"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>

          {/* OR Separator */}
          <div className="my-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400">OR login with</span>
              </div>
            </div>
          </div>

          {/* Social login with background image */}
          <div className="relative mb-2">
            {/* Social login wooden-style button */}
            <div className="relative flex justify-center items-center">
              <div className="relative group w-full cursor-pointer flex items-center justify-center">
                {/* Wooden background */}
                <Image
                  src="/assets/images/buttons/button_bg_authentication.webp" // use your wooden button image (replace with correct path)
                  alt="Google button background"
                  className="absolute inset-0 w-full object-cover"
                />

                {/* Overlay hover glow */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                {/* Text and icon */}
                <div className="relative flex items-center justify-center gap-2 h-full text-[#E6D8A3] font-semibold mt-1 sm:mt-2">
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
