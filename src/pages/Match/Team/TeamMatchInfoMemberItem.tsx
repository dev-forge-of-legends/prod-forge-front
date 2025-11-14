import { capitalizeFirstLetter } from "@app-utils/stringUtils";
import { IconBadge, Image } from "@components/atoms";

interface TeamMatchInfoMemberItemProps {
  key: any;
  avatar: string;
  userName: string;
  level: number;
  status: string;
  isOwner: boolean;
}

const TeamMatchInfoMemberItem: React.FC<TeamMatchInfoMemberItemProps> = (props) => {

  return (
    <div className="flex flex-row justify-between items-center border-1 border-white/10 bg-black/30 rounded-lg p-2 md:p-3 shadow-[inset_4px_4px_20px_0_rgba(100,55,27,0.4)] min-w-65 w-full">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={props.avatar}
          fallbackSrc="/assets/images/users/user12.webp"
          alt="img1"
          className="w-10 md:w-12 h-10 md:h-12 rounded-full border-[1px] border-white/10"
        />
        <div className="flex flex-col justify-between text-white w-full">
          <p className="font-vastagoMedium text-[16px] md:text-[18px]">{props.userName}</p>
          <p className="font-vastagoMedium text-gray-400 text-[12px] md:text-[14px]">{props.level} level</p>
        </div>
      </div>

      <div>
        <IconBadge
          text={capitalizeFirstLetter(props.status)}
        />
        {props.isOwner && <button className="text-white text-[16px] hover:text-red-400 transition-colors">✕</button>}
      </div>
    </div>
  );
};

export default TeamMatchInfoMemberItem;