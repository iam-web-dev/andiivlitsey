import React from 'react'
import image_1 from './Images/image_main.svg'
import play from './Images/play.svg'
import right from './Images/right.svg'
import left from './Images/left.svg'
import image_2 from './Images/image_2.png'
import image_3 from './Images/image_3.png'


const Media_main = () => {
  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-[1220px] h-full flex gap-[20px] pt-[40px] flex mb-[10px] flex-col '>

        <div className='flex flex-col gap-[15px]'>
          <h1 className='font-inter font-[400] text-[18px] text-[#000000]'>Bosh sahifa / <span className='text-[#8D8D8D]'>Media</span></h1>
          <h1 className='font-inter font-[700] text-[36px] text-[#303030]'>Foto galereya</h1>
        </div>


        <div>
          <div>
            <button className='absolute mt-[230px] ml-[-30px] shadow-lg shadow-gray-600 w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 duration-300 flex flex-col justify-center items-center'>
              <img src={left} />
            </button>
            <div>
              <img src={image_1} className='w-[1220px] h-[520px] rounded-[8px] ' />
              <div className='mt-[-94px] mb-[48px] ml-[40px] flex flex-col gap-[10px]'>
                <h1 className='font-inter font-[400] text-[18px] leading-[100%] text-[#FFFFFF]'>09.12.2025</h1>
                <h1 className='font-inter font-[700] text-[18px] leading-[100%] text-[#FFFFFF]'>8-dekabr kuni bayram tadbiridan foto</h1>
              </div>
            </div>
            <button className='absolute ml-[1190px] mt-[-289px]  shadow-lg shadow-gray-600 w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#FFD859] cursor-pointer hover:bg-[#f5be0b] duration-300 flex flex-col justify-center items-center'>
              <img src={right} />
            </button>
          </div>

          <div className='flex gap-[20px] mt-[70px]'>
            <img src={image_1} className='object-cover  cursor-pointer w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_2} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_3} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_2} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_3} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_2} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_3} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
            <img src={image_2} className='opacity-[60%] cursor-pointer object-cover w-[135px] h-[80px] rounded-[6px] border-[2px] border-[#FFD859]' />
          </div>

        </div>



        <div className='mt-[96px] '>

          <div className='flex justify-between'>
            <h1 className='font-inter font-[700] text-[36px] text-[#303030]'>Video galereya</h1>
            <div className='flex gap-[20px]'>
              <button className=' shadow-lg w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#E0E0E0] cursor-pointer hover:bg-gray-200 duration-300 flex flex-col justify-center items-center'>
                <img src={left} />
              </button>
              <button className='  shadow- w-[60px] h-[60px] rounded-[6px] opacity-[80%] bg-[#FFD859] cursor-pointer hover:bg-[#f5be0b] duration-300 flex flex-col justify-center items-center'>
                <img src={right} />
              </button>
            </div>
          </div>


          <div>
            <div className="w-[1220px] overflow-x-auto scrollbar-hide  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex flex-nowrap gap-[20px]">

                <div>
                  <div className="relative mt-[30px] min-w-[570px]">
                    <img src={image_3} className="w-[570px] h-[360px] rounded-[6px] object-cover" />
                    <img src={play} className="absolute inset-0 m-auto" />
                  </div>
                  <div className='w-full  mt-[20px] flex flex-col gap-[10px]'>
                    <h1 className='font-inter font-[400] text-[16px] text-[#979797]'>12-dekabr, 2025</h1>
                    <h1 className='font-inter font-[700] text-[18px] text-[#303030]'>Nomzodlar dissertatsiya ishlaridan video lavhalar</h1>
                  </div>
                </div>

                <div>
                  <div className="relative mt-[30px] min-w-[570px]">
                    <img src={image_3} className="w-[570px] h-[360px] rounded-[6px] object-cover" />
                    <img src={play} className="absolute inset-0 m-auto" />
                  </div>
                  <div className='w-full  mt-[20px] flex flex-col gap-[10px]'>
                    <h1 className='font-inter font-[400] text-[16px] text-[#979797]'>12-dekabr, 2025</h1>
                    <h1 className='font-inter font-[700] text-[18px] text-[#303030]'>Nomzodlar dissertatsiya ishlaridan video lavhalar</h1>
                  </div>
                </div>
                
                <div>
                  <div className="relative mt-[30px] min-w-[570px]">
                    <img src={image_3} className="w-[570px] h-[360px] rounded-[6px] object-cover" />
                    <img src={play} className="absolute inset-0 m-auto" />
                  </div>
                  <div className='w-full  mt-[20px] flex flex-col gap-[10px]'>
                    <h1 className='font-inter font-[400] text-[16px] text-[#979797]'>12-dekabr, 2025</h1>
                    <h1 className='font-inter font-[700] text-[18px] text-[#303030]'>Nomzodlar dissertatsiya ishlaridan video lavhalar</h1>
                  </div>
                </div>


              </div>
            </div>


            <div className='w-full flex justify-center gap-[8px] mt-[40px]'>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#FFD859]'></div>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#D9D9D9]'></div>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#D9D9D9]'></div>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#D9D9D9]'></div>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#D9D9D9]'></div>
              <div className='w-[10px] h-[10px] rounded-[50%] bg-[#D9D9D9]'></div>
            </div>
          </div>

        </div>

      </div>


    </div>

  )
}

export default Media_main