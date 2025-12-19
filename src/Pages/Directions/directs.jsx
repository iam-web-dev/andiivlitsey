import { directionsData } from './data'

const Directs = ({ lang }) => {
    return (
        <div>
            <div className="flex flex-row items-center justify-between mb-[30px]">
                <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
                    {lang === "uz" ? "Yo'nalishlar" : lang === "en" ? "Directions" : "Направления"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full">
                {directionsData.map((item) => (
                    <div key={item.id} onClick={() => window.location.href = `/directions/${item.id}`} className="w-full flex flex-col items-between justify-between bg-[#F4F4F4] hover:bg-[#FFD859] rounded-[8px] duration-300 cursor-pointer min-h-[300px]">
                        <div className="md:p-[30px] sm:p-[25px] p-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-[400] text-[#303030] flex flex-row items-center justify-end gap-[10px]">
                            <p>{item.students} {lang === "uz" ? "nafar o'quvchi" : lang === "en" ? "students" : "студентов"}</p>
                            <hr className='w-[1px] md:h-[22px] h-[16px] bg-[#303030]' />
                            <p>{item.lang}</p>
                        </div>
                        <div className="md:px-[30px] md:py-[40px] sm:px-[25px] sm:py-[30px] px-[20px] py-[20px] flex flex-col gap-[10px]">
                            <p className="md:text-[24px] sm:text-[20px] text-[20px] font-[700] text-[#303030]">{item.title}</p>
                            <p className="md:text-[18px] sm:text-[16px] text-[14px] font-[400] text-[#303030]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Directs