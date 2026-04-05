import { Link, Routes, Route, useLocation, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { DirectionsService } from "../../Services/directions";
import Directs from "./directs";
import Single_dir from "./single_dir";

const Directions_main = ({ lang }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isRoot = pathSegments.length === 1 && pathSegments[0] === "directions";
  const [currentDirection, setCurrentDirection] = useState(null);

  useEffect(() => {
    if (!isRoot && pathSegments[1]) {
      const fetchCurrent = async () => {
        try {
          const data = await DirectionsService.getDirectionBySlug(
            pathSegments[1]
          );
          if (data) {
            setCurrentDirection(data);
          }
        } catch (error) {
          console.error("Failed to fetch direction for breadcrumbs:", error);
        }
      };
      fetchCurrent();
    } else {
      setCurrentDirection(null);
    }
  }, [location.pathname, isRoot]);

  const getTranslated = (item, field) => {
    if (!item) return "";
    const key = `${field}_${lang}`;
    return item[key] || item[field] || "";
  };

  return (
    <div className="w-full h-full flex justify-center bg-[#FFFFFF] animate-fade-in">
      <div className="w-full max-w-[1260px] overflow-hidden flex flex-col pt-[40px] px-[20px] lg:px-[20px] xl:px-0">
        <div className="flex flex-col gap-6 mb-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-sm sm:text-base font-medium">
            <Link
              to="/"
              className="text-gray-400 hover:text-[#cfa92d] transition-colors"
            >
              {lang === "uz"
                ? "Bosh sahifa"
                : lang === "en"
                ? "Home"
                : "Главная"}
            </Link>
            <span className="text-gray-300">/</span>
            {isRoot ? (
              <span className="text-[#cfa92d] font-semibold">
                {lang === "uz"
                  ? "Yo'nalishlar"
                  : lang === "en"
                  ? "Directions"
                  : "Направления"}
              </span>
            ) : (
              <Link
                to="/directions"
                className="text-gray-400 hover:text-[#cfa92d] transition-colors"
              >
                {lang === "uz"
                  ? "Yo'nalishlar"
                  : lang === "en"
                  ? "Directions"
                  : "Направления"}
              </Link>
            )}
            {currentDirection && !isRoot && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-[#cfa92d] font-semibold line-clamp-1 max-w-[200px]">
                  {getTranslated(currentDirection, "title")}
                </span>
              </>
            )}
          </nav>

          {/* Page Header with Accent Bar */}
          {isRoot && (
            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-1 h-8 bg-[#cfa92d] rounded-full"></div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                {lang === "uz"
                  ? "Yo'nalishlar"
                  : lang === "en"
                  ? "Directions"
                  : "Направления"}
              </h1>
              <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
                {lang === "uz"
                  ? "Litseyimizdagi ta'lim yo'nalishlari va imkoniyatlar"
                  : lang === "ru"
                  ? "Образовательные направления и возможности нашего лицея"
                  : "Educational directions and opportunities of our lyceum"}
              </p>
            </div>
          )}
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Directs lang={lang} />} />
            <Route path=":slug" element={<Single_dir lang={lang} />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Directions_main;
