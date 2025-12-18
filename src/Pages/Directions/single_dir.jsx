import React from 'react'
import { useParams, Link } from 'react-router'
import { directionsData } from './data'
import { Users, GraduationCap, ArrowLeft, Calendar, BookOpen } from 'lucide-react'

const Single_dir = () => {
  const { id } = useParams();
  const direction = directionsData.find(d => d.id === parseInt(id));

  if (!direction) {
    window.location.href = "/directions";
  }

  return (
    <div >
      <div className="flex flex-row items-center justify-between mb-[30px]">
        <p className="text-[36px] text-[#303030] font-[700] tracking-tight">
          {direction.title}
        </p>
      </div>
      <div className='flex flex-row gap-[30px]'>
        <div className='p-[30px] rounded-[8px] text-[18px] bg-[#F4F4F4] w-1/2 text-[#303030] font-[400] tracking-tight'>
          <p className="font-[700] mb-[20px]">
            Yo'nalish haqida
          </p>
          <p>{direction.description}</p>
        </div>
        <div className='w-1/2 flex flex-col gap-[30px]'>
          <div className='rounded-[6px] bg-[#FFF6D8] w-full flex p-[30px] flex-row items-center justify-center gap-[20px]'>
            <div className='flex flex-col gap-[10px]'><p className='text-[18px] font-[500] text-[#303030]'>O'quvchilar soni (qabul)</p><p className='text-[24px] font-[700] text-[#303030]'>{direction.students}</p></div>
            <hr className='w-[64px] rotate-90 border-[#303030]' />
            <div className='flex flex-col gap-[10px]'><p className='text-[18px] font-[500] text-[#303030]'>O'qitish tili</p><p className='text-[24px] font-[700] text-[#303030]'>{direction.lang}</p></div>
          </div>
          <div className='rounded-[6px] bg-[#D7E7FF] text-[18px] font-[400] w-full flex p-[30px] flex-col gap-[20px]'>
            <p className="font-[700]">
              O'tiladigan mavzular
            </p>
            <p>
              - Mavzu 1
            </p>
            <p>
              - Mavzu 2
            </p><p>
              - Mavzu 3
            </p><p>
              - Mavzu 4
            </p><p>
              - Mavzu 5
            </p><p>
              - Mavzu 6
            </p>
          </div>
          <div className='rounded-[6px] bg-[#FFD859] text-[16px] font-[500] w-full items-center flex py-[20px] flex-col gap-[20px] cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300'>
          Ariza qoldirish
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single_dir