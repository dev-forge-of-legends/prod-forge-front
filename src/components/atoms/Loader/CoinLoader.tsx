import { Image } from "../Image";
import "./loader.css";
const loader = "/assets/images/sweep.webp";

export const CoinLoader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <Image
        src={loader}
        alt="Coin Loader"
        className="imageAnimation"
        loading="lazy"
      />
    </div>
  );
};
