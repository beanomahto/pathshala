import { useEffect, useContext } from "react";
import axios from "axios";

import { MyContext } from "../App.jsx";
import InputForm from "../components/InputForm.jsx";
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

const Syllabus = () => {
  const { setBranches, setSemesters } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${
          import.meta.env.VITE_API_URL
        }/api/getBranchesAndSemesters`;
        const response = await axios.get(url, {});
        const { semesters, branches } = response.data;
        setBranches(branches);
        setSemesters(semesters);
        //console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // return () => {
    //   setBranch(null);
    //   setSemester(null);
    //   setFlag(false);
    // };
  }, []);

  return (
    <div className="relative py-10 px-20 w-full min-h-screen bg-[#fdfdf9] overflow-hidden">
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
        <div className="flex justify-center">
          <motion.div
            className="px-10 py-6 bg-teal-200 border-4 border-black text-6xl font-bold shadow-[6px_6px_0px_black]"
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

        <InputForm />
      </div>
    </div>
  );
};

export default Syllabus;
