import { useAppSelector } from "@redux/store";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <h1
        className="text-4xl mt-30 mb-8 bg-clip-text
          [background-image:linear-gradient(90deg,#ffc700_0,#ffeca8_51%,#ffc700_100%)]
          [color:transparent] text-5xl font-bold tracking-tight"
      >
        Coming Soon
      </h1>
      <p className="text-lg text-center">
        We're working hard to bring you this feature. Stay tuned!
      </p>
      <Link
        to={user.isAuthenticated ? "/homedashboard" : "/"}
        className="text-center hover:underline"
      >
        <button className="mt-10 w-50 h-15 bg-gradient-to-b from-[#F89F17] to-[#925E0E] rounded-full text-white text-sm font-semibold">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default ComingSoon;
