import { Facebook, Headset, Instagram, Mail, Send } from "lucide-react";
import React from "react";

const Info_section_main = ({ lang, setLang }) => {
  function change_lang(l) {
    setLang(l);
  }
  return (
    <div className="w-full sm:h-[60px] h-[40px] bg-[#FFD859] xl:px-[110px] lg:px-[60px] md:px-[30px] px-[20px] flex items-center xl:justify-between lg:justify-between md:justify-center justify-center text-[#303030]">
      <div className="flex flex-row gap-[20px]">
        <div className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300">
          <Headset className="shrink-0 md:w-[22px] md:h-[22px] w-[15px] h-[15px]" />
          <p className="xl:text-[18px] flex gap-[3px] lg:text-[16px] md:text-[14px] text-[13px] font-[400] whitespace-nowrap">
            +998 (71) 231-77-01<span className="md:block hidden">(navbatchi)</span>
          </p>
        </div>
        <div className="flex flex-row gap-[5px] justify-center items-center hover:scale-[102%] active:scale-[99%] cursor-pointer duration-300">
          <Mail className="shrink-0 md:w-[22px] md:h-[22px] w-[15px] h-[15px]" />
          <p className="xl:text-[18px] lg:text-[16px] md:text-[14px] text-[13px] font-[400]">info@akaandmvd.uz</p>
        </div>
      </div>
      <div className="hidden lg:flex flex-row gap-[40px] items-center justify-center">
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
        <div className="flex flex-row gap-[20px] text-[#303030]">
          <p
            onClick={() => change_lang("uz")}
            className={`text-[18px] ${lang == "uz" && "text-[#906e00]"
              } font-[400] cursor-pointer`}
          >
            O'z
          </p>
          <p
            onClick={() => change_lang("ru")}
            className={`text-[18px] ${lang == "ru" && "text-[#906e00]"
              } font-[400] cursor-pointer`}
          >
            Ру
          </p>
          <p
            onClick={() => change_lang("en")}
            className={`text-[18px] ${lang == "en" && "text-[#906e00]"
              } font-[400] cursor-pointer`}
          >
            En
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info_section_main;
