// import { useEffect, useState } from "react";
// import { UserData } from "@types";
import { Image } from "@components/atoms/Image";

interface MatchersItemProps {
    key:any;
    avatar:string;
    userName:string;
    level:number;
    isOwner:boolean;
    isPublicMatch:boolean;
    readyStatus:string;
    key_id:string;
    myreadyStatus:string;    
    myreadyStyle:string;
    currentuserId:string;
}

const MatchersItem: React.FC<MatchersItemProps> = ( props) => {
    
  return (
    <div className="flex flex-row justify-between items-center m-1 mb-0 border border-b-1 border-0  border-[#FFFFFF0D] pb-1 pt-1">
      <Image
        src={props.avatar}
        fallbackSrc="/assets/images/users/user12.webp"
        alt="img1"
        className="min-h-10 min-w-10 max-h-10 max-w-10 rounded-full mr-2 ml-2"
      />
        <div className="flex flex-col justify-center items-start text-white w-full">
            <h1 className="text-[14px] font-bold">{props.userName}</h1>
            <h1 className="text-[11px]">{props.level}</h1>
        </div>

        <div>
          {( (props.key_id != props.currentuserId) ) ? ((!props.isPublicMatch ) ? ( (props.readyStatus == "joined") ? <h1 className="rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>
           : <h1 className="rounded-xl pl-2 pr-2 text-[12px] w-20  text-[#F03930]  mr-3 text-center bg-[#F039301A]">Not Ready</h1>) :
           <h1 className="rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>)
          :
          ((!props.isPublicMatch ) ? ( (props.readyStatus == "joined") ? <h1 className={props.myreadyStyle}>{props.myreadyStatus}</h1>
           : <h1 className={props.myreadyStyle}>{props.myreadyStatus}</h1>) :
           <h1 className="rounded-xl pl-2 pr-3 text-[12px]  text-[#63A439]  mr-3 bg-[#63A4351A]">Ready</h1>)
          // <h1 className={props.myreadyStyle}>{props.myreadyStatus}</h1>
          }
         
        </div>
        <div>
            {/* <button className="text-white" onClick={() => onChange(user.id, false)}>X</button> */}
            {props.isOwner ? <button className="text-white mr-2 text-[14px]">X</button>: <div></div>}
            
        </div>
    </div>
  );
};

export default MatchersItem;