import React, { useEffect, useState } from "react";
import ProgramCard from "../components/Program/ProgramCard";
import ProgramList from "../components/Program/ProgramList";
import axios from "axios";
import { useSelector } from "react-redux";

const Program = () => {
  const accessInfo = useSelector((state) => state?.user?.access?.accessToken);
  const [programs, setPrograms] = useState([]);

  // Fetch Programs from business
  const getPrograms = async () => {
    try {
      const response = await axios.get(
        `https://api.business.opaqueindustries.news/programs`,
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      setPrograms(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      {/* program card  */}
      <div className="grid grid-cols-3 gap-5 mt-10">
        {programs?.map((program, i) => (
          <div key={i} className="col-span-1">
            <ProgramCard
              title={program?.title}
              lists={program?.ads_array?.length}
            />
          </div>
        ))}
      </div>

      {/* program including blogs  */}
      <ProgramList />
    </div>
  );
};

export default Program;
