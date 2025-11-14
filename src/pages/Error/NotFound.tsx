import { Link } from "react-router-dom";
import { Image } from "@components/atoms/Image";
import { useAppSelector } from "@redux/store";

const NotFound = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/backgrounds/bg.webp')] fixed inset-0 flex items-center justify-center h-full w-full bg-black quicksand-font z-500">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/assets/images/notfound/error.webp"
          alt="Not Found"
          className="w-80 h-80"
          fallbackSrc="/assets/images/notfound/error.webp"
        />
        <div className="flex flex-col justify-center items-center text-center text-white gap-4">
          <div className="flex">
            <p className="text-2xl md:text-4xl text-amber-600">Oops! </p>
            <p className="text-2xl md:text-4xl text-white mx-3">
              We can't find that page
            </p>
          </div>
          <p className="text-gray-400">
            The page you're looking for might have been removed or doesn't
            exist.
          </p>
          <Link
            to={user.isAuthenticated ? "/homedashboard" : "/"}
            className="text-center hover:underline"
          >
            <button className="w-50 h-15 bg-gradient-to-b from-[#F89F17] to-[#925E0E] rounded-full text-white text-sm font-semibold">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
