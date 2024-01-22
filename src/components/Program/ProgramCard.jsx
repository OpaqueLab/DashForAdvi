import React from "react";

const ProgramCard = ({title,lists}) => {
  return (
    <div className="bg-black flex flex-col rounded-lg shadow-lg p-5">
      <div className="flex gap-10">
        {/* cate icon */}
        <div className="w-28 h-28 rounded-lg bg-white text-black flex items-center justify-center text-4xl"></div>
        {/* information */}
        <div className="text-white flex flex-col gap-3">
          <h1 className="text-xl font-bold ">{title}</h1>
          <p className="text-base">Blog List : {lists}</p>
          <button className="text-base text-start rounded-lg py-1 text-red-500 font-bold">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
