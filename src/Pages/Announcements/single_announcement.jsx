import React from 'react';
import { useParams, Link } from 'react-router';
import { announcementsData } from './data';
import { Eye } from 'lucide-react';

const Single_announcement = ({ lang }) => {
    const { id } = useParams();
    const announcementIds = parseInt(id);
    const announcement = announcementsData.find((a) => a.id === announcementIds);

    if (!announcement) {
        return <div className="mt-10 text-center text-xl">{lang === "uz" ? "Topilmadi" : lang === "en" ? "Not Found" : "Не найдено"}</div>;
    }

    // Other announcements (excluding current one, max 3)
    const otherAnnouncements = announcementsData
        .filter(a => a.id !== announcementIds)
        .slice(0, 3);

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-[40px] mt-[30px]">
                {/* Main Content (Left) */}
                <div className="w-full lg:w-2/3">
                    <h1 className="text-[28px] md:text-[36px] font-[700] text-[#303030] leading-[120%] mb-[20px]">
                        {announcement.title[lang]}
                    </h1>
                    <p className="text-[18px] text-[#303030] font-[400] leading-[150%] mb-[30px]">
                        {announcement.desc[lang]}
                    </p>

                    {/* Small parameters light color */}
                    <div className="flex flex-row items-center text-[14px] md:text-[16px] text-[#888888] gap-[20px]">
                        <span>{announcement.date}</span>
                        <div className="flex flex-row items-center gap-[5px]">
                            <Eye size={18} /> {announcement.views}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="w-full lg:w-1/3">
                    <h3 className="text-[24px] font-[600] text-[#303030] mb-[20px]">
                        {lang === "uz" ? "Boshqa e'lonlar" : lang === "en" ? "Other announcements" : "Другие объявления"}
                    </h3>
                    <div className="flex flex-col gap-[20px]">
                        {otherAnnouncements.map((item) => (
                            <Link key={item.id} to={`/announcements/${item.id}`} className="flex flex-col gap-[10px] p-[20px] bg-white border border-[#E0E0E0] rounded-[10px] hover:shadow-lg transition-all duration-300 group">
                                <h4 className="text-[18px] font-[600] text-[#303030] group-hover:text-[#cfa92d] transition-colors line-clamp-2">
                                    {item.title[lang]}
                                </h4>
                                <div className="flex flex-row items-center justify-between text-[14px] text-[#888888]">
                                    <span>{item.date}</span>
                                    <div className="flex items-center gap-[4px]">
                                        <Eye size={14} /> {item.views}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single_announcement;
