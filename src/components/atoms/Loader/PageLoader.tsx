import { Image } from "../Image";
import "./loader.css";
const loader = "/assets/images/loader.gif";

export const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="pageImgContainer">
        <Image
          src={loader}
          alt="Scrooge Hat"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};
