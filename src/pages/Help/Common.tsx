import { useAppSelector } from "@redux/store";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBack = () => {
    if (user.isAuthenticated) {
      navigate("/homedashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <button
        type="button"
        className="w-full px-6 py-3 bg-gradient-to-r from-[#F89F17] to-[#925E0E] hover:from-[#FFB33E] hover:to-[#AD7723] rounded-full text-white font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={handleBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBackButton;