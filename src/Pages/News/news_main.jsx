import React from 'react'
import image_1 from './Images/image_1.jpg'
import eye from './Images/eye.svg'
import eye_white from './Images/eye_white.svg'
import left from './Images/left.svg'
import right from './Images/right.svg'
import picture from './Images/picture.svg'


const News_main = () => {
  return (
    <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
      <div className='w-[1220px] h-full flex gap-[20px] pt-[40px] flex mb-[140px] flex-col '>

        <div className='flex flex-col gap-[15px]'>
          <h1 className='font-inter font-[400] text-[18px] text-[#000000]'>Bosh sahifa / <span className='text-[#8D8D8D]'>Yangiliklar</span></h1>
          <h1 className='font-inter font-[700] text-[36px] text-[#303030]'>Yangiliklar</h1>
        </div>


        <div className='flex gap-[21px]'>


          <div className='w-[806px] flex flex-col'>
            <div className='group cursor-pointer w-[806px] h-[538px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black h-[538px]'>
              <img src={image_1} alt="" className=' w-[806px] h-[538px] opacity-[100%] rounded-[6px]' />
              <div className='ml-[30px] mt-[-122px] brightness-[100%] w-[540px] group-hover:opacity-[200%] flex flex-col gap-[11px]'>
                <h1 className='font-inter font-[700] text-[24px] leading-[100%] text-[#FFFFFF]'>Korrupsiyasiz jamiyat – barqaror rivojlanish asosi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#B7B8B7]'>12-dekabr, 2025 <span>|</span>  <img src={eye} /> <span className=''>7042</span></h1>
              </div>
            </div>

            <div className='mt-[30px] flex flex-wrap gap-x-[20px] gap-y-[60px]'>
              <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
                <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
              </div>
              <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
                <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
              </div>
              <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
                <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
              </div>
              <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
                <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
              </div>

            </div>

          </div>


          <div className='flex flex-col gap-[60px]'>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px] '>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>

          </div>


        </div>

        <div>
          <div className='flex gap-[20px]'>
            <div className='group cursor-pointer w-[600px] h-[400px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black'>
              <img src={image_1} alt="" className=' w-[600px] h-[400px] opacity-[100%] rounded-[6px]' />
              <div className='ml-[30px] mt-[-122px] brightness-[100%] w-[540px] group-hover:opacity-[200%] flex flex-col gap-[11px]'>
                <h1 className='font-inter font-[700] text-[24px] leading-[100%] text-[#FFFFFF]'>Korrupsiyasiz jamiyat – barqaror rivojlanish asosi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#B7B8B7]'>12-dekabr, 2025 <span>|</span>  <img src={eye} /> <span className=''>7042</span></h1>
              </div>
            </div>
            <div className='group cursor-pointer w-[600px] h-[400px] duration-300 hover:brightness-[70%] rounded-[6px] bg-black'>
              <img src={image_1} alt="" className=' w-[600px] h-[400px] opacity-[100%] rounded-[6px]' />
              <div className='ml-[30px] mt-[-122px] brightness-[100%] w-[540px] group-hover:opacity-[200%] flex flex-col gap-[11px]'>
                <h1 className='font-inter font-[700] text-[24px] leading-[100%] text-[#FFFFFF]'>Korrupsiyasiz jamiyat – barqaror rivojlanish asosi</h1>
                <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#B7B8B7]'>12-dekabr, 2025 <span>|</span>  <img src={eye} /> <span className=''>7042</span></h1>
              </div>
            </div>
          </div>

          <div className='flex gap-[20px] mt-[30px]'>

            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>
            <div className='flex flex-col gap-[11px] w-[393px] h-[82px]'>
              <h1 className='w-[393px]  font-inter font-[400] leading-[100%] text-[20px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
              <h1 className='flex items-center gap-[10px] font-inter font-[400] leading-[100%] text-[18px] text-[#C1C1C1]'>12-dekabr, 2025 <span>|</span>  <img src={eye_white} /> <span className=''>7042</span></h1>
            </div>

          </div>

          <div className='w-full flex justify-center mt-[60px]'>

            <div className='flex items-center gap-[20px]'>
              <img src={left} alt="" />
              <div className='flex justify-center items-center w-[50px] h-[48px] bg-[#14386F] rounded-[4px] font-inter font-[700] text-[20px] leading-[100%] text-[#FFFFFF]'>1</div>
              <div className='flex justify-center items-center w-[50px] h-[48px] bg-white rounded-[4px] font-inter font-[400] text-[20px] leading-[100%] text-[#303030]'>2</div>
              <div className='flex justify-center items-center w-[50px] h-[48px] bg-white rounded-[4px] font-inter font-[400] text-[20px] leading-[100%] text-[#303030]'>3</div>
              <div className='flex justify-center items-center w-[50px] h-[48px] bg-white rounded-[4px] font-inter font-[400] text-[20px] leading-[100%] text-[#303030]'>...</div>
              <div className='flex justify-center items-center w-[50px] h-[48px] bg-white rounded-[4px] font-inter font-[400] text-[20px] leading-[100%] text-[#303030]'>6</div>
              <img src={right} alt="" />

            </div>

          </div>

        </div>


      </div>



    </div>


  )
}

export default News_main
