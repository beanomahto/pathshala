import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../App.jsx";
import { motion } from "framer-motion";

const OscillatingCube = ({ size, top, left, color, delay }) => {
  return (
    <motion.div
      className="absolute border-4 border-black rounded-sm shadow-[6px_6px_0px_black]"
      style={{
        width: size,
        height: size,
        top,
        left,
        backgroundColor: color,
      }}
      animate={{
        y: [0, -20, 0], // up-down oscillation
        rotate: [0, 5, -5, 0], // slight tilt
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

const Final = () => {
  const [years, setYears] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/getYear`;
        const response = await axios.get(url, {});
        setYears(response.data);
        setYear(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { branch, subject, semester } = useContext(MyContext);
  const type = {
    0: "syllabus",
    1: "mid_1",
    2: "mid_2",
    3: "end",
  };

  const handleClick = async (t) => {
    const url = `${import.meta.env.VITE_API_URL}/api/getPdf`;
    try {
      const response = await axios.get(url, {
        params: {
          semester: semester,
          branch: branch,
          subject: subject,
          type: t,
          year: year,
        },
      });
      if (response.data && response.data.url) {
        window.open(response.data.url, "_blank");
      } else {
        console.log("No PDF URL returned");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative py-8 px-4 sm:px-10 md:px-20 w-full min-h-screen bg-[#fdfdf9] overflow-hidden">
      {/* Background oscillating cubes */}
      <OscillatingCube
        size={100}
        top="20%"
        left="24%"
        color="#f97316"
        delay={0}
      />
      <OscillatingCube
        size={120}
        top="40%"
        left="80%"
        color="#374151"
        delay={1}
      />
      <OscillatingCube
        size={80}
        top="60%"
        left="4%"
        color="#60a5fa"
        delay={2}
      />
      <OscillatingCube
        size={90}
        top="80%"
        left="50%"
        color="#f9da62ff"
        delay={1.5}
      />
      <OscillatingCube
        size={40}
        top="90%"
        left="80%"
        color="#facc15"
        delay={1}
      />
      <OscillatingCube
        size={70}
        top="80%"
        left="10%"
        color="#facc15"
        delay={1}
      />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Year selector */}
        <div className="flex justify-end mb-4">
          <select
            className="px-3 py-2 border-2 border-black rounded-lg 
                       bg-white text-black font-medium shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-teal-400 
                       text-sm sm:text-base"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years &&
              years.map((y, idx) => (
                <option key={idx} value={y}>
                  {y}
                </option>
              ))}
          </select>
        </div>

        {/* Title */}
        <div className="flex justify-center">
          <motion.div
            className="px-6 sm:px-10 py-4 sm:py-6 bg-teal-300 border-4 border-black 
                       text-3xl sm:text-5xl md:text-6xl font-bold 
                       shadow-[6px_6px_0px_black] text-center"
            initial={{ y: -200, rotate: -15, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, rotate: -2, scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              type: "spring",
              stiffness: 80,
            }}
          >
            Bank
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {Object.values(type).map((t, idx) => (
              <button
                key={idx}
                className="p-4 sm:p-6 bg-teal-200 border-4 border-black rounded-xl 
                           shadow-[6px_6px_0px_black] text-base sm:text-lg font-extrabold 
                           hover:translate-x-1 hover:translate-y-1 
                           hover:shadow-[2px_2px_0px_black] 
                           transition-all duration-200 w-full break-words whitespace-normal overflow-hidden"
                onClick={() => handleClick(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;
