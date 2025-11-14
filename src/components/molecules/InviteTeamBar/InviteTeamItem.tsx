import { Team } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";
import { useEffect, useState } from "react";

interface InviteTeamItemProps {
  team: Team;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const InviteTeamItem = ({ team, checked, onChange }: InviteTeamItemProps) => {
  const [itemChecked, setItemChecked] = useState(checked);
  const handleToggle = (id: string, checked: boolean) => {
    setItemChecked(checked);
    onChange(id, checked);
  }
  useEffect(() => {
    setItemChecked(checked);
  }, [checked]);
  return (
    <div className="flex flex-row justify-between items-center w-full border-b-1 border-b-white/10">
      <div className="flex flex-row items-center gap-2 py-4 md:py-5">
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
      <div>
        <input type="checkbox" className="min-w-5 min-h-5 max-w-5 max-h-5"
          checked={itemChecked}
          onChange={(e) => handleToggle(team.id, e.target.checked)} />
      </div>
    </div>
  );
};
