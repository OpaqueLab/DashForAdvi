import { Button, Modal } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalTable from "../components/ModalTable";
import ListDropDown from "../components/ListDropDown";
import { useDisclosure } from "@mantine/hooks";

const List = () => {
  const accessInfo = useSelector((state) => state?.user?.access?.accessToken);
  const userId = useSelector((state) => state?.user?.access?.id);
  const [checkedItems, setCheckedItems] = useState([]);
  const [list, setList] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAllList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ads/allAds`,
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      // console.log(response);
      setList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      // console.log(response);
      setPrograms(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllList();
    getPrograms();
  }, [refresh]);

  // console.log(list);
  const getStatusProperties = (status) => {
    switch (status) {
      case 4:
        return { className: "bg-green-500", text: "Publish" };
      case 1:
        return { className: "bg-orange-500", text: "Pending" };
      case 0:
        return { className: "bg-red-500", text: "Draft" };
      default:
        return { className: "", text: "Unknown Status" };
    }
  };

  // pendigng
  const handleSubmitPending = async (ads_id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads/PublishRequest`,
        {
          a_id: ads_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for check and collect id
  const handleCheck = (e, _id) => {
    e.stopPropagation();
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [_id]: !prevCheckedItems[_id],
    }));

    setBlogs((prevBlogs) => {
      if (e.target.checked) {
        return [...prevBlogs, _id];
      } else {
        return prevBlogs.filter((blogId) => blogId !== _id);
      }
    });
  };

  // submit program
  const submitProgram = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(blogs.toString());
    console.log(userId)
    try {
      const res = await axios.post(
        "https://api.business.opaqueindustries.news/programs",
        {
          business_id: userId,
          p_id: title,
          ads_list: blogs.toString(),
          title: title,
        },
        {
          headers:{Authorization:`Bearer ${accessInfo}`}
        }
      );
      console.log(res);
    } catch (error) {console.log(error)}
  };

  const match = (el) => {
    return programs.find((program) => program?._id === el?.programsArray[0]);
  };

  return (
    <div>
      {/* Filter entries select and Add program Button*/}
      <div className="px-3 py-5 border-b flex items-center justify-between dark:border-primary">
        {/* add to program  */}
        <div>
          <button
            onClick={openModal}
            className="p-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
          >
            Add Program ( {blogs.length} )
          </button>
        </div>
      </div>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1"></h1>
        <h1 className="col-span-1">No.</h1>
        <h1 className="col-span-2">Name</h1>
        <h1 className="col-span-2">Date</h1>
        <h1 className="col-span-2">Program</h1>
        <h1 className="col-span-2">Status</h1>
        <h1 className="col-span-1">Request</h1>
        <h1 className="col-span-1">Action</h1>
      </div>

      {/* Table Row */}
      <div className="flex flex-col-reverse">
        {list.map((el, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 ">
              <div className="col-span-1 flex justify-center items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={checkedItems[el?._id]}
                  onClick={(e) => handleCheck(e, el?._id)}
                />
              </div>
              <div className="col-span-1 flex justify-center items-center">
                {index + 1}
              </div>
              {/* Name */}
              <p className="col-span-2">{el?.author}</p>
              {/* Date */}
              <p className="col-span-2">{el?.date}</p>
              <p className="col-span-2">{match(el)?.title}</p>
              {/* Status */}
              <div className="col-span-2 cursor-pointer flex items-center justify-center gap-3">
                <div
                  className={`flex justify-center items-center ${
                    getStatusProperties(el?.status).className
                  } rounded-md px-3 text-white`}
                >
                  {getStatusProperties(el?.status).text}
                </div>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                {/********************************************************************************* *****************************************************************************************************************************************************************/}
                <button
                  disabled={el?.status === 1 ? true : false}
                  onClick={() => handleSubmitPending(el?._id)}
                  className={`${el?.status === 1 ? "dis-btn" : "submit-btn"}`}
                >
                  submit
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <ListDropDown
                  values={
                    el?.status === 1
                      ? ["edit", "history"]
                      : ["edit", "history", "delete"]
                  }
                  open={open}
                  ads_info={el}
                  accessInfo={accessInfo}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </div>
            </div>

            <Modal opened={opened} onClose={close} title="History">
              <ModalTable />
            </Modal>
          </div>
        ))}
      </div>

      {/* Add to program  */}
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="Add Program"
        size="md"
      >
        {/* Modal content */}
        <div className="flex flex-col justify-center gap-10 w-full h-full">
          {/* program select  */}
          <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col gap-3">
              <label className="font-bold " htmlFor="">
                Choose You Created Program
              </label>
              <select
                className="py-2 px-5 outline-none"
                name="programs"
                id="programs"
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Select an option</option>
                {programs?.map((el) => (
                  <option key={el} value={el?._id}>
                    {el?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* button  */}
          <div className="flex justify-around">
            {/* Submit button */}
            <Button variant="primary" onClick={submitProgram}>
              Submit
            </Button>

            {/* Example Close button */}
            <Button variant="light" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default List;
