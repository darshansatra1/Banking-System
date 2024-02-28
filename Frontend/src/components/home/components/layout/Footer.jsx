import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineSecurity, MdReviews } from "react-icons/md";
import moment from "moment";

const navIcons = [
  <AiFillHome size={17} className=" mr-1" />,
  <BsInfoCircleFill size={17} className=" mr-1" />,
  <MdReviews size={17} className="mr-1" />,
  <AiFillSetting size={17} className="mr-1" />,
  <MdOutlineSecurity size={17} className="mr-1" />,
];

export default function Footer() {
  return (
    <footer className="py-10 bg-[#0f172a]">
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-10 md:px-12">
        <div className="text-center grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-between gap-4 lg:justify-self-start lg:col-span-3">
          </div>


          <div className="flex flex-col gap-4 justify-between items-center lg:justify-self-end lg:col-span-4">
            <p className="text-slate-100 text-sm">
              All Rights Reserved ©SBS {moment().year()}
            </p>
            <p className="text-base !font-sans font-semibold text-green-500 ">
                SBS is your one-stop banking solution!
              </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
