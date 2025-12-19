import React from 'react'
import { useParams, Link } from 'react-router'
import { directionsData } from './data'
import { Users, GraduationCap, ArrowLeft, Calendar, BookOpen } from 'lucide-react'

const Single_dir = ({ lang }) => {
  const { id } = useParams();
  const direction = directionsData.find(d => d.id === parseInt(id));

  if (!direction) {
    window.location.href = "/directions";
  }

  return (
    <div >
      <div className="flex flex-row items-center justify-between mb-[30px]">
        <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
          {direction.title}
        </p>
      </div>
      <div className='flex flex-col lg:flex-row gap-[30px]'>
        <div className='md:p-[30px] sm:p-[25px] p-[20px] rounded-[8px] sm:text-[18px] text-[16px] bg-[#F4F4F4] w-full lg:w-1/2 text-[#303030] font-[400] tracking-tight'>
          <p className="font-[700] mb-[10px] sm:mb-[20px]">
            {lang === "uz" ? "Yo'nalish haqida" : lang === "en" ? "About direction" : "О направлении"}
          </p>
          <p>{direction.description}</p>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col gap-[30px]'>
          <div className='rounded-[6px] bg-[#FFF6D8] w-full flex lg:p-[25px] md:p-[30px] p-[20px] flex-col sm:flex-row lg:items-center justify-center md:gap-[20px] gap-[10px]'>
            <div className='flex flex-col gap-[5px] md:gap-[10px] items-start text-center sm:text-left'>
              <p className='md:text-[18px] sm:text-[16px] text-[14px] font-[500] text-[#303030]'>
                {lang === "uz" ? "O'quvchilar soni (qabul)" : lang === "en" ? "Number of students (admission)" : "Количество студентов (прием)"}
              </p>
              <p className='md:text-[24px] text-[20px] font-[700] text-[#303030]'>{direction.students}</p>
            </div>
            <hr className='w-full lg:w-[64px] h-[1px] sm:w-[1px] sm:h-[64px] bg-[#303030]/30 border-none' />
            <div className='flex flex-col gap-[5px] md:gap-[10px] items-start text-center sm:text-left'>
              <p className='md:text-[18px] sm:text-[16px] text-[14px] font-[500] text-[#303030]'>
                {lang === "uz" ? "O'qitish tili" : lang === "en" ? "Language of instruction" : "Язык обучения"}
              </p>
              <p className='md:text-[24px] text-[20px] font-[700] text-[#303030]'>{direction.lang}</p>
            </div>
          </div>
          <div className='rounded-[6px] bg-[#D7E7FF] text-[16px] md:text-[18px] font-[400] w-full flex lg:p-[25px] md:p-[30px] p-[20px] flex-col gap-[10px] md:gap-[20px]'>
            <p className="font-[700]">
              {lang === "uz" ? "O'tiladigan mavzular" : lang === "en" ? "Topics covered" : "Изучаемые темы"}
            </p>
            <p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 1
            </p>
            <p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 2
            </p><p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 3
            </p><p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 4
            </p><p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 5
            </p><p>
              - {lang === "uz" ? "Mavzu" : lang === "en" ? "Topic" : "Тема"} 6
            </p>
          </div>
          <div className='rounded-[6px] bg-[#FFD859] text-[16px] font-[500] w-full items-center flex py-[20px] flex-col cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300'>
            {lang === "uz" ? "Ariza qoldirish" : lang === "en" ? "Submit application" : "Оставить заявку"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single_dir