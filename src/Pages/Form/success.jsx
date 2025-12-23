import React from 'react'
import tick from './Images/tick.svg'
import { Link } from 'react-router'
const Success = () => {
    return (
        <div className='w-full h-full flex flex-col items-center py-[120px] sm:py-[140px]'>

            <img src={tick} className='w-[60px] h-[60px]' />
            <h1 className='text-center mt-[20px] font-inter font-[700] text-[24px] sm:text-[36px] leading-[100%] text-[#303030]'>Ma’lumotlaringiz qabul qilindi!</h1>
            <h1 className='text-center mt-[10px] font-inter font-[400] text-[16px] sm:text-[18px] leading-[100%] text-[#969696]'>Operator tez orada siz bilan bog‘lanadi.</h1>
            <Link to='/'>
                <button className='mt-[30px] w-[174px] sm:w-[193px] h-[47px] sm:h-[49px] rounded-[4px] bg-[#FFD859] flex justify-center items-center font-inter font-[500] text-[14px] sm:text-[16px] text-[#303030]'>Bosh sahifaga o‘tish</button>
            </Link>
        </div>
    )
}

export default Success