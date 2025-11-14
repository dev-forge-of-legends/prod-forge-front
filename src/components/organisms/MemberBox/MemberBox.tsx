import { Image } from "../../atoms/Image";

interface Member {
  name: string;
  level: number;
  avatar: string;
}

export const MemberBox = ({ name, level, avatar }: Member) => {
  return (
    <div className="flex flex-row items-center w-full border-1 border-white/10 bg-black/30 rounded-lg p-3 md:p-4 shadow-[inset_4px_4px_20px_0_rgba(100,55,27,0.4)]">
      <div>
        <Image
          src={avatar || "assets/images/users/user0.webp"}
          fallbackSrc={avatar || "assets/images/users/user0.webp"}
          alt={name}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="text-white mx-4">
        <h1 className="font-vastagoMedium text-2xl">{name}</h1>
        <p className="font-vastagoMedium text-gray-600">Level : {level}</p>
      </div>
    </div>
  );
};
