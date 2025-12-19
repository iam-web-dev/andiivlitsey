import React from "react";
import facebook from './Images/facebook.svg'
import instagram from './Images/instagram.svg'
import telegram from './Images/telegram.svg'

const Footer_main = () => {
  return (
    <div className="w-full h-[509px] bg-[#14386F] flex flex-col items-center pt-[80px]">


      <div className="w-[1220px]">

        <div className="flex gap-[120px] w-full h-[152px]">

          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[20px] leading-[100%] text-[#FFFFFF]">Ijtimoiy tarmoqlar</h1>
            <div className="flex flex-row gap-[30px]">
              <img src={facebook} />
              <img src={instagram} />
              <img src={telegram} />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[20px] text-[#FFFFFF]">Bog‘lanish</h1>
            <h1 className="font-inter font-[400] text-[18px] text-[#B5D3FF]">+998 (71) 235-70-07 (navbatchi)</h1>
            <h1 className="font-inter font-[400] text-[18px] text-[#B5D3FF]">+998 (71) 235-77-07 (faks)</h1>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[20px] text-[#FFFFFF]">Manzil</h1>
            <h1 className="w-[207px] font-inter font-[400] text-[18px] text-[#B5D3FF]">100000, O‘zbekiston Respublikasi, Andijon shahri, Bobur ko‘chasi, 11-uy</h1>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h1 className="font-inter font-[600] text-[20px] text-[#FFFFFF]">Email</h1>
            <h1 className="w-[207px] font-inter font-[400] text-[18px] text-[#B5D3FF]">info@akaandijonmvd.uz</h1>
          </div>

        </div>

        <div className="flex justify-between mt-[80px]">
          <h1 className="w-[283px] font-inter font-[700] text-[20px] text-[#FFFFFF]">Ichki ishlar vazirligi Andijon viloyati akademik litseyi</h1>
          <h1 className="font-inter font-[400] text-[18px] text-[#B5D3FF]">Sayt ishlab chiquvchisi: <span className="font-[600] "><a href="https://t.me/nsd_corporation">NSD Corporation</a></span></h1>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full h-[1px] bg-[#7892ba] mt-[80px]"></div>
          <h1 className="mt-[10px] font-inter font-[400] text-[18px] text-[#B5D3FF]"> © 2018-2025. Barcha huquqlar himoyalangan</h1>
        </div>

      </div>

    </div>
  );
};

export default Footer_main;
