import { Link } from "react-router";
import logo from "../logo.jpg";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Navbar_main = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const timerRef = useRef(null);

  const path_list = [
    {
      path: "/about",
      name: "Litsey haqida",
      select: [
        { path: "/about/history", name: "Litsey tarixi" },
        { path: "/about/team", name: "Rahbariyat" },
        { path: "/about/offer", name: "Litsey nizomi" },
      ],
    },
    { path: "/directions", name: "Yo'nalishlar", select: [] },
    { path: "/news", name: "Yangiliklar", select: [] },
    { path: "/announcements", name: "E'lonlar", select: [] },
    { path: "/media", name: "Media", select: [] },
  ];

  return (
    <div className="w-full sticky h-[105px] flex px-[110px] items-center justify-between text-[#303030]">
      <Link to={"/"} className="flex items-center gap-[10px]">
        <img src={logo} alt="logo" className="w-[60px] h-[60px]" />
        <p className="text-[20px] font-[700] leading-[120%]">
          Ichki ishlar vazirligi Andijon <br /> viloyati akademik litseyi
        </p>
      </Link>

      <div className="flex gap-[40px]">
        {path_list.map((item, idx) => (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => {
              clearTimeout(timerRef.current);
              if (item.select.length > 0) setAboutOpen(true);
            }}
            onMouseLeave={() => {
              timerRef.current = setTimeout(() => setAboutOpen(false), 300);
            }}
          >
            {item.select.length > 0 ? (
              <>
                <div className="flex items-center gap-[5px] hover:text-[#cfa92d] duration-300 cursor-pointer text-[18px] font-[500]">
                  <span>{item.name}</span>
                  <ChevronDown
                    size={18}
                    className={`duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <div
                  className={`absolute top-[40px] left-0 w-[220px] bg-[#14386F] text-white shadow-lg rounded-[8px]
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${aboutOpen ? "max-h-[300px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}
                >
                  {item.select.map((s, index) => (
                    <Link
                      key={index}
                      to={s.path}
                      className="block px-[16px] py-[12px] text-[18px] hover:bg-[#1B4D9A] duration-200"
                      onClick={() => setAboutOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.path}
                onMouseEnter={()=>setAboutOpen(false)}
                className="text-[18px] font-[500] hover:text-[#cfa92d] duration-300"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
      <Link to={"/form"} className={`px-[20px] py-[15px] rounded-[5px] bg-[#FFD859] hover:bg-[#14386F] hover:text-white duration-300`} >
        <p className="text-[16px] font-[500]">Ariza qoldirish</p>
      </Link>
    </div>
  );
};

export default Navbar_main;
