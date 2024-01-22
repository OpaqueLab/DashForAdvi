import React from "react";

const ProgramList = () => {
  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1">No.</h1>
        <h1 className="col-span-3">Name</h1>
        <h1 className="col-span-2">Date</h1>
        <h1 className="col-span-2">Status</h1>
        <h1 className={"col-span-2"}>Request</h1>
        <h1 className="col-span-2">Action</h1>
      </div>

      {/* Table Row */}
      <div className="flex flex-col-reverse">
        <div>
          <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 ">
            <div className="col-span-1 flex justify-center items-center">1</div>
            <p className="col-span-3">author</p>
            <p className="col-span-2">date</p>
            <div className="col-span-2 cursor-pointer flex items-center justify-center gap-3">
              <span>status</span>
            </div>
            <div className="col-span-2">
                request
            </div>
            <div className="col-span-2">
                action
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramList;
