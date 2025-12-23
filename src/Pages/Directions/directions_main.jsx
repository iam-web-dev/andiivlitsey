import { Link, Routes, Route, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { DirectionsService } from '../../services/directions'
import Directs from './directs'
import Single_dir from './single_dir'

const Directions_main = ({ lang }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isRoot = pathSegments.length === 1 && pathSegments[0] === 'directions';
  const [currentDirection, setCurrentDirection] = useState(null);

  useEffect(() => {
    if (!isRoot && pathSegments[1]) {
      const fetchCurrent = async () => {
        try {
          const data = await DirectionsService.getDirectionById(pathSegments[1]);
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
    <div className='md:mx-[60px] lg:mx-[110px] mx-[20px] min-h-[60vh]'>
      <div className='sm:text-[18px] text-[14px] font-[500] flex items-center gap-[10px] mt-[30px]'>
        <Link to={"/"} className='hover:text-[#cfa92d] duration-200'>
          {lang === "uz" ? "Bosh sahifa" : lang === "en" ? "Home" : "Главная"}
        </Link>
        <span className='text-[#ccc]'>/</span>
        {isRoot ? (
          <span className='text-[#cfa92d]'>
            {lang === "uz" ? "Yo'nalishlar" : lang === "en" ? "Directions" : "Направления"}
          </span>
        ) : (
          <Link to="/directions" className='hover:text-[#cfa92d] duration-200'>
            {lang === "uz" ? "Yo'nalishlar" : lang === "en" ? "Directions" : "Направления"}
          </Link>
        )}

        {currentDirection && !isRoot && (
          <>
            <span className='text-[#ccc]'>/</span>
            <span className='text-[#cfa92d] font-semibold line-clamp-1 max-w-[200px]'>
              {getTranslated(currentDirection, 'title')}
            </span>
          </>
        )}
      </div>
      <div className='mt-[20px]'>
        <Routes>
          <Route path="/" element={<Directs lang={lang} />} />
          <Route path=":id" element={<Single_dir lang={lang} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Directions_main;