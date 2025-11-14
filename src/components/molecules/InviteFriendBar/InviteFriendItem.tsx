import { UserData } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";
import { useEffect, useState } from "react";

interface InviteFriendItem {
  user: UserData;
  isDelete: boolean;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const InviteFriendItem = ({ user, isDelete, checked, onChange }: InviteFriendItem) => {
  const [itemChecked, setItemChecked] = useState(checked);
  const handleToggle = (id: string, checked: boolean) => {
    setItemChecked(checked);
    onChange(id, checked);
  }
  useEffect(() => {
    setItemChecked(checked);
  }, [checked]);
  return (
    //  <div className="flex flex-row justify-between items-center w-full border-b-1 border-b-white/10">
    <div className="flex flex-row h-16 justify-between items-center m-2 rounded-lg shadow-[inset_4px_4px_20px_0_rgba(100,55,27,0.4)]">
      <Image
        src={user.avatar}
        fallbackSrc="/assets/images/users/user12.webp"
        alt="img1"
        className="min-h-10 min-w-10 max-h-10 max-w-10 group-hover:opacity-100 shrink-0 rounded-full m-2  border-[2px] "
      />
      <div className="flex flex-col justify-start text-white w-full">
        <h1>{user.userName}</h1>
        <h1>{user.level}</h1>
      </div> 
      {isDelete ? (
        <div className="mr-2">
          <button className="text-white" onClick={() => onChange(user.id, false)}>X</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" className="min-w-5 min-h-5 max-w-5 max-h-5"
            checked={itemChecked}
            onChange={(e) => handleToggle(user.id, e.target.checked)} />
        </div>
      )}
    </div>
  );
};
