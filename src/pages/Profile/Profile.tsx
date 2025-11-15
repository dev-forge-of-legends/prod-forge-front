import {
  apiChangePassword,
  apiGetUser /*, apiUpdateAvatar*/,
  apiUpdateUser,
} from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { BgButton, BgInput } from "@components/atoms";
import { Image } from "@components/atoms/Image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface SimpleSignupFormData {
  username: string;
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [avatarModalOpen, setAvatarModalOpen] = useState<boolean>(false);
  // const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserData>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [formData, setFormData] = useState<SimpleSignupFormData>({
    username: "",
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  // Sample avatar options - you can replace these with your actual avatar paths
  const avatarOptions = [
    "/assets/images/users/user0.webp",
    "/assets/images/users/user1.webp",
    "/assets/images/users/user2.webp",
    "/assets/images/users/user3.webp",
    "/assets/images/users/user4.webp",
    "/assets/images/users/user5.webp",
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const data = await apiGetUser();
    setProfile(data);
  };

  // const handleLogout = async () => {
  //   await apiLogout();
  //   navigate("/");
  // };

  const handleAvatarClick = () => {
    setAvatarModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await apiUpdateUser(formData.email, formData.username);
      console.log(res);
      toast.success("User Profile Updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to Update Profile!");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const res = await apiChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log(res);
      toast.success("User Profile Updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to Update Profile!");
    }
  };

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
    case "password":
      if (!value.trim()) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      break;
    case "currentPassword":
      if (!value.trim()) {
        errors.currentPassword = "Password is required";
      } else if (value.length < 6) {
        errors.currentPassword = "Password must be at least 6 characters";
      }
      break;
    case "confirmPassword":
      if (!value) {
        errors.confirmPassword = "Please confirm your password";
      } else if (value !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Here you would typically upload the file to your server
      // For now, we'll create a local URL for preview
      const imageUrl = URL.createObjectURL(file);

      // Update the profile with new avatar
      // await apiUpdateAvatar(file); // Uncomment when your API is ready

      // Temporary update until API is implemented
      setProfile((prev) => (prev ? { ...prev, avatar: imageUrl } : undefined));

      setAvatarModalOpen(false);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAvatarSelect = async (avatarPath: string) => {
    setIsUploading(true);
    try {
      // Update the profile with selected avatar
      // await apiUpdateAvatar(avatarPath); // Uncomment when your API is ready

      // Temporary update until API is implemented
      setProfile((prev) =>
        prev ? { ...prev, avatar: avatarPath } : undefined
      );

      setAvatarModalOpen(false);
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Failed to update avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="ml-4">
        <h1 className="text-white text-[36px] font-vastagoSemiBold">
          Edit Profile
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px] md:w-[450px]">
          <div>
            <h1 className="text-[#9E9E9E] text-[24px] font-vastagoMedium">
              User Information
            </h1>
          </div>
          <div className="flex flex-col items-center mt-10 mb-6">
            <div
              className="relative group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative border-4 border-gray-800 rounded-full p-1 bg-gray-900 group-hover:border-amber-500/50 transition-all duration-300">
                <Image
                  src={profile?.avatar || "/assets/images/users/user0.webp"}
                  fallbackSrc="/assets/images/users/user0.webp"
                  alt="Profile Avatar"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-2xl object-cover"
                />
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              {/* Edit Pencil Icon */}
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-amber-500 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-white text-[18px] font-vastagoMedium">
              USER NAME
            </p>
            <BgInput
              type="name"
              placeholder={profile?.userName}
              value={formData.username}
              onChange={(e) => updateFormData("username", e.target.value)}
              className="h-12 w-full"
              error={fieldErrors.username}
            />
          </div>
          <div className="mb-6">
            <p className="text-white text-[18px] font-vastagoMedium">
              EMAIL ADDRESS
            </p>
            <BgInput
              type="email"
              placeholder={profile?.email}
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={"h-12 w-full"}
              error={fieldErrors.email}
            />
          </div>
          <div className="my-2">
            <BgButton
              size="cards"
              className="w-[200px] h-10 bg-gradient-to-b from-[#F89F17] to-[#925E0E] text-[white] text-[16px] font-vastagoSemiBold"
              onClick={handleUpdate}
            >
              SAVE USER INFO
            </BgButton>
          </div>
        </div>
        <div>
          <div className="w-[300px] md:w-[450px]">
            <div className="mb-4">
              <h1 className="text-[#9E9E9E] text-[24px] font-vastagoMedium">
                Password Reset
              </h1>
            </div>
            <div>
              {" "}
              <div></div>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-white text-[18px] font-vastagoMedium">
              CURRENT PASSWORD
            </label>
            <BgInput
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) =>
                updateFormData("currentPassword", e.target.value)
              }
              className={"h-12 w-full"}
              error={fieldErrors.currentPassword}
            />
          </div>
          <div className="mb-4">
            <label className="text-white text-[18px] font-vastagoMedium">
              CHANGE PASSWORD
            </label>
            <BgInput
              type="password"
              placeholder="Set Password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              className={"h-12 w-full"}
              error={fieldErrors.password}
            />
          </div>
          <div className="mb-6">
            <label className="text-white text-[18px] font-vastagoMedium">
              CONFIRM PASSWORD
            </label>
            <BgInput
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                updateFormData("confirmPassword", e.target.value)
              }
              className={"h-12 w-full"}
              error={fieldErrors.confirmPassword}
            />
          </div>
          <div className="my-2">
            <BgButton
              size="cards"
              className="w-[200px] h-10 bg-gradient-to-b from-[#F89F17] to-[#925E0E] text-[white] text-[16px] font-vastagoSemiBold"
              onClick={handleUpdatePassword}
            >
              CHANGE PASSWORD
            </BgButton>
          </div>
        </div>
      </div>
      {avatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl border border-gray-700/50 shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                  Choose Your Avatar
                </h3>
                <button
                  onClick={() => setAvatarModalOpen(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-2xl transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Upload from File */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Upload Custom Avatar
                </label>
                <div className="flex flex-col items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl text-purple-300 hover:text-purple-200 hover:border-purple-400/50 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Choose from Device"
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    JPG, PNG or WEBP. Max 5MB.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Or choose from preset
                  </span>
                </div>
              </div>

              {/* Preset Avatars */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Preset Avatars
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {avatarOptions.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => handleAvatarSelect(avatar)}
                      disabled={isUploading}
                      className="relative group aspect-square rounded-2xl border-2 border-gray-600 hover:border-amber-400 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Image
                        src={avatar}
                        fallbackSrc="/assets/images/users/user0.webp"
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-colors duration-300"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
              <button
                onClick={() => setAvatarModalOpen(false)}
                className="w-full py-3 px-4 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-2xl text-gray-300 hover:text-white transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
