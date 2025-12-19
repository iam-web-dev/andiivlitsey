import { Link, Routes, Route, useLocation } from 'react-router';
import Announcements_list from './announcements_list';
import Single_announcement from './single_announcement';
import { announcementsData } from './data';

const Announcements_main = ({ lang }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isRoot = pathSegments.length === 1 && pathSegments[0] === 'announcements';
  const currentId = !isRoot ? parseInt(pathSegments[1]) : null;
  const currentAnnouncement = currentId ? announcementsData.find(d => d.id === currentId) : null;

  return (
    <div className='md:mx-[60px] lg:mx-[110px] mx-[20px] min-h-[60vh]'>
      <div className='sm:text-[18px] text-[14px] font-[500] flex items-center gap-[10px] mt-[30px]'>
        <Link to={"/"} className='hover:text-[#cfa92d] duration-200 whitespace-nowrap'>
          {lang === "uz" ? "Bosh sahifa" : lang === "en" ? "Home" : "Главная"}
        </Link>
        <span className='text-[#ccc]'>/</span>
        {isRoot ? (
          <span className='text-[#cfa92d]'>
            {lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления"}
          </span>
        ) : (
          <Link to="/announcements" className='hover:text-[#cfa92d] duration-200'>
            {lang === "uz" ? "E'lonlar" : lang === "en" ? "Announcements" : "Объявления"}
          </Link>
        )}

        {currentAnnouncement && (
          <>
            <span className='text-[#ccc]'>/</span>
            <span className='text-[#cfa92d] font-semibold line-clamp-1 max-w-[200px]'>
              {currentAnnouncement.title[lang]}
            </span>
          </>
        )}
      </div>

      <div className='mt-[20px]'>
        <Routes>
          <Route path="/" element={<Announcements_list lang={lang} />} />
          <Route path=":id" element={<Single_announcement lang={lang} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Announcements_main;