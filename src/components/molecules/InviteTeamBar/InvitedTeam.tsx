import { Team } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";

interface InvitedTeamProps {
  team: Team;
  onChange: (id: string) => void;
  className?: string;
}

export const InvitedTeam = ({ team, onChange, className }: InvitedTeamProps) => {
  return (
    <div className={`flex flex-row justify-between items-center w-full border-1 border-white/10 bg-black/30 rounded-lg p-3 md:p-4 shadow-[inset_4px_4px_20px_0_rgba(100,55,27,0.4)] ${className || ""}`}>
      <div className="flex flex-row items-center gap-2">
        <Image
          src={team.avatar}
          fallbackSrc="/assets/images/users/user12.webp"
          alt="img1"
          className="w-10 md:w-12 h-10 md:h-12 rounded-full border-[1px] border-white/10"
        />
        <div className="flex flex-col justify-between text-white w-full">
          <p className="font-vastagoMedium text-[16px] md:text-[18px]">{team.name}</p>
          <p className="font-vastagoMedium text-gray-400 text-[12px] md:text-[14px]">{team.members.length} members</p>
        </div>
      </div>
      <button className="text-white text-[20px]" onClick={() => onChange(team.id)}>✕</button>
    </div>
  );
};
