import { useEffect, useState } from "react";
import { DirectionsService } from "../../Services/directions";

import Loader_main from "../../Components/Loader/loader_main";

const Directs = ({ lang }) => {
  const [directionsList, setDirectionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirections = async () => {
      setLoading(true);
      try {
        const data = await DirectionsService.getDirections();
        if (data && data.results) {
          setDirectionsList(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch directions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDirections();
  }, []);

  const getTranslated = (item, field) => {
    const key = `${field}_${lang}`;
    return item[key] || item[field] || "";
  };

  if (loading) {
    return <Loader_main className="h-[400px]" />;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-row items-center justify-between mb-[30px]">
        <p className="md:text-[36px] sm:text-[31px] text-[28px] text-[#303030] font-[700] tracking-tight">
          {lang === "uz"
            ? "Yo'nalishlar"
            : lang === "en"
            ? "Directions"
            : "Направления"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full">
        {directionsList.map((item) => (
          <div
            key={item.id}
            onClick={() => (window.location.href = `/directions/${item.slug}`)}
            className="w-full flex flex-col justify-between bg-[#F4F4F4] hover:bg-[#FFD859] rounded-[8px] duration-300 cursor-pointer min-h-[300px]"
          >
            <div className="md:p-[30px] sm:p-[25px] p-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-[400] text-[#303030] flex flex-row items-center justify-end gap-[10px]">
              {item.quota !== undefined && item.quota !== null && (
                <>
                  <p>
                    {item.quota}{" "}
                    {lang === "uz"
                      ? "nafar o'quvchi"
                      : lang === "en"
                      ? "students"
                      : "студентов"}
                  </p>
                  <hr className="w-[1px] md:h-[22px] h-[16px] bg-[#303030]" />
                </>
              )}
              <p>{getTranslated(item, "language")}</p>
            </div>

            <div className="md:px-[30px] md:py-[40px] sm:px-[25px] sm:py-[30px] px-[20px] py-[20px] flex flex-col gap-[10px]">
              <p className="md:text-[24px] sm:text-[20px] text-[20px] font-[700] text-[#303030]">
                {getTranslated(item, "title")}
              </p>
              <p className="md:text-[18px] sm:text-[16px] text-[14px] font-[400] text-[#303030] line-clamp-3">
                {getTranslated(item, "description")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directs;
