import { Image } from "../../atoms/Image";

const InviteFriendBar = (props: any) => {
  return (
    <div className="flex flex-row justify-between items-center m-5">
      <Image
        src={props.avatar}
        fallbackSrc={props.avatar}
        alt="img1"
        className="w-min-6 h-min-6 w-max-6 h-max-6 rounded-full bg-[blue] mr-2"
      />
      <div className="flex flex-col justify-start text-white w-full">
        <h1>{props.name}</h1>
        <h1>{props.level}</h1>
      </div>
      {props.isDelete ? (
        <div>
          <button className="text-white">X</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" className="w-7 h-7"/>
        </div>
      )}
    </div>
  );
};

export default InviteFriendBar;
