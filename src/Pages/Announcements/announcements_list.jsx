import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AnnouncementsService } from '../../Services/announcements';
import { Eye } from 'lucide-react';
import { Pagination } from '@mui/material';

import Loader_main from '../../Components/Loader/loader_main';

const Announcements_list = ({ lang }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 9; // Default for desktop from earlier context

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const data = await AnnouncementsService.getAnnouncements(currentPage);
                if (data && data.results) {
                    setAnnouncements(data.results);
                    setTotalCount(data.count);
                }
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const getTranslated = (item, field) => {
        const key = `${field}_${lang}`;
        return item[key] || item[field] || "";
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const locale = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru' : 'en-US';
        return date.toLocaleDateString(locale, options);
    };

    if (loading) {
        return <Loader_main className="h-[400px]" />;
    }

    const totalPages = Math.ceil(totalCount / 10); // Standard Django REST pagination is often 10, but I'll use 10 for now based on common API behavior unless I see otherwise.

    return (
        <div className="animate-fade-in">
            {/* Title */}
            <div className="flex flex-row items-center justify-between mb-[30px]">
                <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
                    {lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления"}
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                {announcements.map((item) => (
                    <Link key={item.id} to={`/announcements/${item.id}`} className="pl-[20px] pr-[20px] flex flex-col gap-[10px] py-[30px] w-full border border-[#52525289] rounded-[10px] shadow-lg hover:shadow-xl hover:scale-[102%] active:scale-[99%] duration-300 group cursor-pointer bg-white">
                        <div className="flex flex-row items-center text-[16px] sm:text-[18px] text-[#52525289] leading-[130%] gap-[10px]">
                            <div>{formatDate(item.created_at)}</div>
                            <hr className="w-[22px] rotate-90" />
                            <div className="flex flex-row gap-[7px]">
                                <Eye width={22} height={22} /> {item.views_count || 0}
                            </div>
                        </div>
                        <p className="text-[20px] sm:text-[24px] text-[#303030] group-hover:text-[#cfa92d] duration-300 font-[700] leading-[130%] line-clamp-2">
                            {getTranslated(item, 'title')}
                        </p>
                        <p className="text-[16px] sm:text-[18px] text-[#525252] font-[400] leading-[130%] line-clamp-1">
                            {getTranslated(item, 'content')}
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
