import { Link, Routes, Route, useLocation } from 'react-router'
import { directionsData } from './data'
import Directs from './directs'
import Single_dir from './single_dir'

const Directions_main = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isRoot = pathSegments.length === 1 && pathSegments[0] === 'directions';

  const currentId = !isRoot ? parseInt(pathSegments[1]) : null;

  const currentDirection = currentId ? directionsData.find(d => d.id === currentId) : null;

  return (
    <div className='mx-[110px] min-h-[60vh]'>
      <div className='text-[18px] font-[500] flex items-center gap-[10px] mt-[30px]'>
        <Link to={"/"} className='hover:text-[#cfa92d] duration-200'>Bosh sahifa</Link>
        <span className='text-[#ccc]'>/</span>
        {isRoot ? (
          <span className='text-[#cfa92d]'>Yo'nalishlar</span>
        ) : (
          <Link to="/directions" className='hover:text-[#cfa92d] duration-200'>Yo'nalishlar</Link>
        )}

        {currentDirection && (
          <>
            <span className='text-[#ccc]'>/</span>
            <span className='text-[#cfa92d] font-semibold'>{currentDirection.title}</span>
          </>
        )}
      </div>
      <div className='mt-[20px]'>
        <Routes>
          <Route path="/" element={<Directs />} />
          <Route path=":id" element={<Single_dir />} />
        </Routes>
      </div>
    </div>
  )
}

export default Directions_main