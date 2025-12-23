import React from 'react'
import './style.css'
import { Link } from 'react-router'

const Success = ({ lang }) => {
    const t = {
        title: {
            uz: "Ma’lumotlaringiz qabul qilindi!",
            ru: "Ваши данные приняты!",
            en: "Your data has been accepted!"
        },
        subtitle: {
            uz: "Operator tez orada siz bilan bog‘lanadi.",
            ru: "Оператор свяжется с вами в ближайшее время.",
            en: "An operator will contact you shortly."
        },
        button: {
            uz: "Bosh sahifaga o‘tish",
            ru: "Перейти на главную",
            en: "Go to home page"
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center py-[120px] sm:py-[140px] px-4'>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            <h1 className='text-center mt-[20px] font-inter font-[700] text-[24px] sm:text-[36px] leading-[120%] text-[#303030] max-w-[600px]'>
                {t.title[lang] || t.title.uz}
            </h1>
            <p className='text-center mt-[10px] font-inter font-[400] text-[16px] sm:text-[18px] leading-[120%] text-[#969696] max-w-[500px]'>
                {t.subtitle[lang] || t.subtitle.uz}
            </p>
            <Link to='/'>
                <button className='mt-[40px] px-8 h-[49px] rounded-[4px] bg-[#FFD859] flex justify-center items-center font-inter font-[500] text-[14px] sm:text-[16px] text-[#303030] hover:bg-[#ffcf33] transition duration-300'>
                    {t.button[lang] || t.button.uz}
                </button>
            </Link>
        </div>
    )
}

export default Success