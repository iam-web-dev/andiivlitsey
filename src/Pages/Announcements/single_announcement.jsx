import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { AnnouncementsService } from "../../Services/announcements";
import { Eye } from "lucide-react";

import Loader_main from "../../Components/Loader/loader_main";

const Single_announcement = ({ lang }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await AnnouncementsService.getAnnouncementBySlug(slug);
        if (data) {
          setAnnouncement(data);
        } else {
          navigate("/404", { replace: true });
          return;
        }
        const othersData = await AnnouncementsService.getAnnouncements(1);
        if (othersData && othersData.results) {
          setOthers(
            othersData.results.filter((a) => a.slug !== slug).slice(0, 3)
          );
        }
      } catch (error) {
        console.error("Failed to fetch announcement details:", error);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const getTranslated = (item, field) => {
    const key = `${field}_${lang}`;
    return item[key] || item[field] || "";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const locale = lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru" : "en-US";
    return date.toLocaleDateString(locale, options);
  };

  if (loading) {
    return <Loader_main className="h-[400px]" />;
  }

  if (!announcement) {
    return (
      <div className="mt-10 text-center text-xl">
        {lang === "uz"
          ? "Topilmadi"
          : lang === "en"
          ? "Not Found"
          : "Не найдено"}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-[40px] mt-[30px]">
        {/* Main Content (Left) */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-[28px] md:text-[36px] font-[700] text-[#303030] leading-[120%] mb-[20px]">
            {getTranslated(announcement, "title")}
          </h1>
          <div className="text-[18px] text-[#303030] font-[400] leading-[150%] mb-[30px] whitespace-pre-wrap">
            {getTranslated(announcement, "content")}
          </div>

          {/* Small parameters light color */}
          <div className="flex flex-row items-center text-[14px] md:text-[16px] text-[#888888] gap-[20px]">
            <span>{formatDate(announcement.created_at)}</span>
            <div className="flex flex-row items-center gap-[5px]">
              <Eye size={18} /> {announcement.views_count || 0}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-[24px] font-[600] text-[#303030] mb-[20px]">
            {lang === "uz"
              ? "Boshqa e'lonlar"
              : lang === "en"
              ? "Other announcements"
              : "Другие объявления"}
          </h3>
          <div className="flex flex-col gap-[20px]">
            {others.map((item) => (
              <Link
                key={item.id}
                to={`/announcements/${item.slug}`}
                className="flex flex-col gap-[10px] p-[20px] bg-white border border-[#E0E0E0] rounded-[10px] hover:shadow-lg transition-all duration-300 group"
              >
                <h4 className="text-[18px] font-[600] text-[#303030] group-hover:text-[#cfa92d] transition-colors line-clamp-2">
                  {getTranslated(item, "title")}
                </h4>
                <div className="flex flex-row items-center justify-between text-[14px] text-[#888888]">
                  <span>{formatDate(item.created_at)}</span>
                  <div className="flex items-center gap-[4px]">
                    <Eye size={14} /> {item.views_count || 0}
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
