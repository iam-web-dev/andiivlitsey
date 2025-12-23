import React from 'react'
import image_1 from './Images/image_1.jpg'



const Single_new = () => {
    return (

        <div className='w-full h-full flex justify-center bg-[#FFFFFF]'>
            <div className='w-full sm:w-[1220px] overflow-hidden flex  flex-col gap-[20px] pt-[40px] sm:px-[0px] px-[20px]'>

                <div className='flex flex-col'>


                    <div className='flex flex-col gap-[15px]'>
                        <h1 className='font-inter font-[600] text-[14px] sm:text-[18px] text-[#000000] hover:text-[#cfa92d] duration-150'><a href="/">Bosh sahifa</a> <span className='text-gray-400'>/</span> <span className='text-[#cfa92d]'>Yangiliklar</span></h1>
                        <h1 className='font-inter font-[700] text-[28px] sm:text-[36px] text-[#303030]'>Akademik litseyda yangi yo‘nalishlar ochildi</h1>
                    </div>

                    <img src={image_1} className='mt-[20px] w-[610px] h-[407px] rounded-[6px]' />
                </div>





            </div>
        </div>


    )
}

export default Single_new