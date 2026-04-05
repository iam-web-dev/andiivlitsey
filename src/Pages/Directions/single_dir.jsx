import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { DirectionsService } from "../../Services/directions";

import Loader_main from "../../Components/Loader/loader_main";

const Single_dir = ({ lang }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirection = async () => {
      setLoading(true);
      try {
        const data = await DirectionsService.getDirectionBySlug(slug);
        if (data) {
          setDirection(data);
        } else {
          navigate("/404", { replace: true });
          return;
        }
      } catch (error) {
        console.error("Failed to fetch direction:", error);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchDirection();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const getTranslated = (item, field) => {
    if (!item) return "";
    const key = `${field}_${lang}`;
    return item[key] || item[field] || "";
  };

  if (loading) {
    return <Loader_main className="h-[400px]" />;
  }

  if (!direction) {
    return (
      <div className="h-[400px] flex items-center justify-center text-xl">
        {lang === "uz"
          ? "Yo'nalish topilmadi"
          : lang === "en"
          ? "Direction not found"
          : "Направление не найдено"}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-row items-center justify-between mb-[30px]">
        <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
          {getTranslated(direction, "title")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-[30px]">
        {/* Chap taraf - Tavsif */}
        <div className="md:p-[30px] sm:p-[25px] p-[20px] rounded-[8px] sm:text-[18px] text-[16px] bg-[#F4F4F4] w-full lg:w-1/2 text-[#303030] font-[400] tracking-tight">
          <p className="font-[700] mb-[10px] sm:mb-[20px]">
            {lang === "uz"
              ? "Yo'nalish haqida"
              : lang === "en"
              ? "About direction"
              : "О направлении"}
          </p>
          <div className="whitespace-pre-wrap">
            {getTranslated(direction, "description")}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-[30px]">
          <div className="rounded-[6px] bg-[#FFF6D8] w-full flex lg:p-[25px] md:p-[30px] p-[20px] flex-col sm:flex-row sm:items-center justify-center md:gap-[20px] gap-[10px]">
            <div className="flex flex-col gap-[5px] md:gap-[10px] items-start text-center sm:text-left">
              <p className="md:text-[18px] sm:text-[16px] text-[14px] font-[500] text-[#303030]">
                {lang === "uz"
                  ? "O'quvchilar soni (qabul)"
                  : lang === "en"
                  ? "Number of students (admission)"
                  : "Количество студентов (прием)"}
              </p>
              <p className="md:text-[24px] text-[20px] font-[700] text-[#303030]">
                {direction.quota || 0}
              </p>
            </div>
            <hr className="w-[64px] h-[1px] sm:rotate-90 bg-[#303030]/30 border-none" />
            <div className="flex flex-col gap-[5px] md:gap-[10px] items-start text-center sm:text-left">
              <p className="md:text-[18px] sm:text-[16px] text-[14px] font-[500] text-[#303030]">
                {lang === "uz"
                  ? "O'qitish tili"
                  : lang === "en"
                  ? "Language of instruction"
                  : "Язык обучения"}
              </p>
              <p className="md:text-[24px] text-[20px] font-[700] text-[#303030]">
                {getTranslated(direction, "language")}
              </p>
            </div>
          </div>

          {/* O'tiladigan mavzular */}
          <div className="rounded-[6px] bg-[#D7E7FF] text-[16px] md:text-[18px] font-[400] w-full lg:p-[25px] md:p-[30px] p-[20px] flex flex-col gap-[10px] md:gap-[20px]">
            <p className="font-[700]">
              {lang === "uz"
                ? "O'tiladigan mavzular"
                : lang === "en"
                ? "Topics covered"
                : "Изучаемые темы"}
            </p>
            <div className="whitespace-pre-wrap">
              {getTranslated(direction, "subjects") || (
                <span className="text-[#303030]/60">
                  {lang === "uz"
                    ? "Mavzular kiritilmagan"
                    : lang === "en"
                    ? "No topics specified"
                    : "Темы не указаны"}
                </span>
              )}
            </div>
          </div>

          {/* Ariza tugmasi */}
          <Link to="/form">
            <div className="rounded-[6px] bg-[#FFD859] text-[16px] font-[500] w-full items-center flex py-[20px] justify-center cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300">
              {lang === "uz"
                ? "Ariza qoldirish"
                : lang === "en"
                ? "Submit application"
                : "Оставить заявку"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Single_dir;
