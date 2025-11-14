export const RejectedModal = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-[#F039305A] w-[3%] self-center rounded-full text-red-700 text-center">+</div>
      </div>
      <div className=" text-white text-center">
        Your request to join Shadow Clan was rejected!
      </div>
      <div className=" text-white text-center">
        <div className="md:mx-[10%] mt-[8%] mb-[4%] flex justify-between">
          <button className="w-[45%] bg-transparent backdrop-blur-sm backdrop-filte border-2 border-amber-500 py-2 px-4 rounded-4xl">
            Cancel
          </button>
          <button
            className="w-[45%] bg-red-500 py-2 px-4 rounded-4xl"
          >
            Join Other Team
          </button>
        </div>
      </div>
    </div>
  );
};

