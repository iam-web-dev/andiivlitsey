import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { announcementsData } from './data';
import { Eye } from 'lucide-react';
import { Pagination } from '@mui/material';

const Announcements_list = ({ lang }) => {
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Mobile breakpoint
                setItemsPerPage(7);
            } else {
                setItemsPerPage(9);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(announcementsData.length / itemsPerPage);
    const currentData = announcementsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div>
            {/* Title */}
            <div className="flex flex-row items-center justify-between mb-[30px]">
                <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
                    {lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления"}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                {currentData.map((item) => (
                    <Link key={item.id} to={`/announcements/${item.id}`} className="pl-[20px] pr-[20px] flex flex-col gap-[10px] py-[30px] w-full border border-[#52525289] rounded-[10px] shadow-lg hover:shadow-xl hover:scale-[102%] active:scale-[99%] duration-300 group cursor-pointer bg-white">
                        <div className="flex flex-row items-center text-[16px] sm:text-[18px] text-[#52525289] leading-[130%] gap-[10px]">
                            <div>{item.date}</div>
                            <hr className="w-[22px] rotate-90" />
                            <div className="flex flex-row gap-[7px]">
                                <Eye width={22} height={22} /> {item.views}
                            </div>
                        </div>
                        <p className="text-[20px] sm:text-[24px] text-[#303030] group-hover:text-[#cfa92d] duration-300 font-[700] leading-[130%]">
                            {item.title[lang]}
                        </p>
                        <p className="text-[16px] sm:text-[18px] text-[#525252] font-[400] leading-[130%] line-clamp-3">
                            {item.desc[lang]}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-[40px]">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        variant="outlined"
                        shape="rounded"
                        sx={{
                            '& .Mui-selected': {
                                backgroundColor: '#cfa92d !important',
                                color: 'white',
                                borderColor: '#cfa92d !important',
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};
export default Announcements_list;
