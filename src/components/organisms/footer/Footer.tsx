import { Image } from "@components/atoms/Image";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="mt-8 ml-8 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/privacy-and-policy">
            <p className="text-gray-400 text-sm underline hover:text-amber-400 transition-colors duration-200">
              Privacy and Policy
            </p>
          </Link>
          <Link to="/terms-and-condition">
            <p className="text-gray-400 text-sm underline hover:text-amber-400 transition-colors duration-200">
              Terms and Condition
            </p>
          </Link>
          <Link to="/sweep-rules">
            <p className="text-gray-400 text-sm underline hover:text-amber-400 transition-colors duration-200">
              Sweep Rules
            </p>
          </Link>
          <Link to="/how-to-play">
            <p className="text-gray-400 text-sm underline hover:text-amber-400 transition-colors duration-200">
              How To Play
            </p>
          </Link>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/assets/images/footer/1.webp"
              fallbackSrc="/assets/images/footer/1.webp"
              alt="Forge of Legends"
              className="w-8 h-8 md:w-10 md:h-10 hover:brightness-125 transition-all duration-200"
            />
          </Link>
          <Link
            to="/"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/assets/images/footer/2.webp"
              fallbackSrc="/assets/images/footer/2.webp"
              alt="Forge of Legends"
              className="w-8 h-8 md:w-10 md:h-10 hover:brightness-125 transition-all duration-200"
            />
          </Link>
          <Link
            to="/"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/assets/images/footer/3.webp"
              fallbackSrc="/assets/images/footer/3.webp"
              alt="Forge of Legends"
              className="w-8 h-8 md:w-10 md:h-10 hover:brightness-125 transition-all duration-200"
            />
          </Link>
          <Link
            to="/"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <Image
              src="/assets/images/footer/4.webp"
              fallbackSrc="/assets/images/footer/4.webp"
              alt="Forge of Legends"
              className="w-8 h-8 md:w-10 md:h-10 hover:brightness-125 transition-all duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
