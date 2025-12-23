import React from "react";
import facebook from './Images/facebook.svg'
import instagram from './Images/instagram.svg'
import telegram from './Images/telegram.svg'
import nsd_logo from '../nsd_logo.png'

const Footer_main = () => {
  return (
    <div className="w-full min-h-fit bg-[#14386F] flex flex-col items-center pt-[60px] sm:pt-[80px] pb-[40px] sm:pb-[60px]">

      <div className="w-full px-[20px] md:px-[40px] lg:px-[60px] xl:px-0 xl:w-[1220px]">

        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-[30px] md:gap-y-[40px] xl:gap-[120px]">

          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] leading-[100%] text-[#FFFFFF]">Ijtimoiy tarmoqlar</h1>
            <div className="flex flex-row gap-[30px]">
              <img src={facebook} alt="Facebook" loading="lazy" />
              <img src={instagram} alt="Instagram" loading="lazy" />
              <img src={telegram} alt="Telegram" loading="lazy" />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">Bog‘lanish</h1>
            <h1 className="font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF]">+998 (71) 235-70-07 (navbatchi)</h1>
            <h1 className="font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF]">+998 (71) 235-77-07 (faks)</h1>
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">Manzil</h1>
            <h1 className="w-full sm:w-[207px] font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF]">100000, O‘zbekiston Respublikasi, Andijon shahri, Bobur ko‘chasi, 11-uy</h1>
          </div>

          <div className="flex flex-col gap-[10px] sm:gap-[20px]">
            <h1 className="font-inter font-[600] text-[18px] sm:text-[20px] text-[#FFFFFF]">Email</h1>
            <h1 className="w-full sm:w-[207px] font-inter font-[400] text-[16px] sm:text-[18px] text-[#B5D3FF]">info@akaandijonmvd.uz</h1>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center mt-[40px] md:mt-[60px] xl:mt-[80px] gap-[20px] md:gap-[0px]">
          <h1 className="w-full md:w-[350px] xl:w-[283px] font-inter font-[700] text-[18px] sm:text-[20px] text-[#FFFFFF]">Ichki ishlar vazirligi Andijon viloyati akademik litseyi</h1>
          <div onClick={() => window.open("https://t.me/nsd_corporation", "_blank")} className="flex flex-col text-white sm:items-end font-[600] text-[13px] cursor-pointer"><p className="pl-[12px] md:pr-[13px]">Powered by</p><img src={nsd_logo} className="w-[250px] h-auto" /></div>
        </div>

        <div className="flex flex-col sm:items-center">
          <div className="w-full h-[1px] bg-[#7892ba] mt-[40px] md:mt-[60px]"></div>
          <h1 className="mt-[10px] font-inter font-[400] text-[16px] sm:text-[18px] sm:text-[#B5D3FF] text-[#6485B7]"> © 2018-2025. Barcha huquqlar himoyalangan</h1>
        </div>

      </div>

    </div>
  );
};

export default Footer_main;
