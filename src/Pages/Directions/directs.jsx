import React from 'react'
import { Link } from 'react-router'
import { directionsData } from './data'
import { Users, GraduationCap, ArrowRight } from 'lucide-react'

const Directs = () => {
    return (
        <div>
            <div className="flex flex-row items-center justify-between mb-[30px]">
                <p className="text-[36px] text-[#303030] font-[700] tracking-tight">
                    Yo'nalishlar
                </p>
            </div>

            <div className="flex flex-row flex-wrap gap-[20px] items-center justify-center w-full">
                {directionsData.map((item) => (
                    <div key={item.id} onClick={()=>window.location.href = `/directions/${item.id}`} className="w-[600px] h-[400px] flex flex-col items-between justify-between bg-[#F4F4F4] hover:bg-[#FFD859] rounded-[8px] duration-300 cursor-pointer">
                        <div className="p-[30px] text-[18px] font-[400] text-[#303030] flex flex-row items-center justify-end gap-[10px]">
                            <p>{item.students} nafar o'quvchi</p>
                            <hr className='w-[1px] h-[22px] bg-[#303030]' />
                            <p>{item.lang}</p>
                        </div>
                        <div className="pl-[30px] pb-[40px] flex flex-col gap-[10px]">
                            <p className="text-[24px] font-[700] text-[#303030]">{item.title}</p>
                            <p className="text-[18px] font-[400] text-[#303030]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Directs