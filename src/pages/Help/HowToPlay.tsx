import { BgButton, Image } from "@components/atoms";
import { Carousel } from "@components/atoms/Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const HowToPlay = () => {
  const ImgList = [
    {
      id: "1",
      text: "Roll the dice on your turn. You need a 6 to bring a pawn out of home. Roll again if you get a 6.",
      image: "/assets/images/howto/1.webp",
    },
    {
      id: "2",
      text: "Move your pawn forward by the number rolled. Pawns travel clockwise around the board aiming to reach the center safe zone.",
      image: "/assets/images/howto/2.webp",
    },
    {
      id: "3",
      text: "Land on an opponent's pawn to send it back home. Pawns on safe squares cannot be captured.",
      image: "/assets/images/howto/3.webp",
    },
    {
      id: "4",
      text: "Move all your pawns safely into the center. The first player to bring all pawns to the castle wins the game.",
      image: "/assets/images/howto/4.webp",
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-4 md:mt-8 items-center text-center">
        <p className="text-white text-[24px] md:text-[28px] font-vastagoSemiBold">
          LUDO RULES
        </p>
        <p className="text-[28px] md:text-[36px] text-amber-400 font-vastagoSemiBold">
          FORGE OF LEGIONS
        </p>
      </div>

      <div>
        <Carousel
          items={ImgList.map((img) => (
            <div className="text-center px-4 md:px-12 lg:px-16 xl:px-20">
              <div className="flex justify-center">
                <Image
                  src={img.image}
                  fallbackSrc={img.image}
                  alt="Forge of Legends"
                  className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[460px]"
                />
              </div>
              <div className="mx-auto max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[520px]">
                <p className="text-white text-[15px]">{img.text}</p>
              </div>
            </div>
          ))}
        />
      </div>
      <div className="flex justify-center">
        <BgButton
          onClick={() => navigate("/homedashboard")}
          className="w-60 h-12 p-4 text-center"
        >
          <span className="text-yellow-bright text-[12px] md:text-[16px] font-vastagoMedium"> Go Back</span>
        </BgButton>
      </div>
    </div>
  );
};

export default HowToPlay;
