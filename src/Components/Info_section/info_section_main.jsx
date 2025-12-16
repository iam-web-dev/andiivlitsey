import { Facebook, Headset, Instagram, Mail, Send } from "lucide-react";
import React from "react";

const Info_section_main = () => {
  return (
    <div className="w-full h-[60px] bg-[#FFD859] px-[110px] flex items-center justify-between text-[#303030]">
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300">
          <Headset width={22} height={22} />
          <p className="text-[18px] font-[400]">
            +998 (71) 231-77-01 (navbatchi)
          </p>
        </div>
        <div className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300">
          <Mail width={22} height={22} />
          <p className="text-[18px] font-[400]">info@akaandmvd.uz</p>
        </div>
      </div>
      <div className="flex flex-row gap-[40px] items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-[30px]">
          <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300">
            <Facebook width={26} height={26} />
          </div>
          <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300">
            <Instagram width={26} height={26} />
          </div>
          <div className="cursor-pointer hover:scale-[102%] active:scale-[99%] duration-300">
            <Send width={26} height={26} />
          </div>
        </div>
        <hr className="w-[24px] rotate-90 border-[#303030]" />
        <div className="flex flex-row gap-[20px]">
          <p className="text-[18px] text-[#9e7e16] font-[400] cursor-pointer">O'z</p>
          <p className="text-[18px] text-[#303030] font-[400] cursor-pointer">Ру</p>
          <p className="text-[18px] text-[#303030] font-[400] cursor-pointer">En</p>
        </div>
      </div>
    </div>
  );
};

export default Info_section_main;
