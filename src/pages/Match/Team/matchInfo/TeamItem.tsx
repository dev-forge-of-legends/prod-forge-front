// import { useEffect, useState } from "react";
// import { UserData } from "@types";
import { Image } from "@components/atoms/Image";

interface TeamItemProps {
  key: any;
  avatar: string;
  teamName: string;
  members: number;
  isOwner: boolean;
  isPublicMatch: boolean;
  readyStatus: string;
  key_id: string;
  myreadyStatus: string;
  myreadyStyle: string;
  currentteamId: string;
}

const TeamItem: React.FC<TeamItemProps> = (props) => {

  return (
    <div className="flex flex-row justify-between items-center m-1.5 mb-0 border border-[#FFFFFF1A] bg-black/30 rounded-2xl p-4 h-[74px] w-[50%]">
      <Image
        src={props.avatar}
        fallbackSrc="/assets/images/users/user12.webp"
        alt="img1"
        className="min-h-12 min-w-12 max-h-12 max-w-12 rounded-full mr-3 ml-2"
      />
      <div className="flex flex-col justify-center items-start text-white w-full gap-1">
        <h1 className="text-[15px] font-bold">{props.teamName}</h1>
        <h1 className="text-[12px]">{props.members} members</h1>
      </div>

      <div>
        {((props.key_id != props.currentteamId)) ? ((!props.isPublicMatch) ? ((props.readyStatus == "joined") ? <h1 className="rounded-xl pl-3 pr-4 py-1.5 text-[13px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>
          : <h1 className="rounded-xl pl-3 pr-3 py-1.5 text-[13px] w-24  text-[#F03930]  mr-3 text-center bg-[#F039301A]">Not Ready</h1>) :
          <h1 className="rounded-xl pl-3 pr-4 py-1.5 text-[13px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>)
          :
          ((!props.isPublicMatch) ? ((props.readyStatus == "joined") ? <h1 className={props.myreadyStyle}>{props.myreadyStatus}</h1>
            : <h1 className={props.myreadyStyle}>{props.myreadyStatus}</h1>) :
            <h1 className="rounded-xl pl-3 pr-4 py-1.5 text-[13px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>)
        }
        {/* {props.isOwner ? <h1 className="rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Owner</h1>: <div></div>} */}

      </div>
      <div>
        {/* <button className="text-white" onClick={() => onChange(user.id, false)}>X</button> */}
        {props.isOwner ? <button className="text-white mr-3 text-[16px] hover:text-red-400 transition-colors">X</button> : <div></div>}

      </div>
    </div>
  );
};

export default TeamItem;