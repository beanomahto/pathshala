import { useContext } from "react";
import { MyContext } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const InputForm = () => {
  const {
    branch,
    setBranch,
    flag,
    setFlag,
    subjects,
    setSubjects,
    semester,
    setSemester,
    branches,
    semesters,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/getAllSubjects/${semester}/${branch}`;
      const response = await axios.get(url);
      if (response.data) {
        setSubjects(response.data);
        navigate(`/home/${semester}/${branch}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center px-2 sm:px-6 py-4 sm:py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-3 sm:p-6 md:p-8 border-4 border-black
                   shadow-[2px_2px_0px_black] sm:shadow-[4px_4px_0px_black] md:shadow-[6px_6px_0px_black]
                   rounded-xl w-full max-w-md space-y-4 sm:space-y-6"
      >
        {/* Branch Dropdown */}
        <div>
          <label className="block mb-2 font-bold text-base sm:text-lg">
            Branch
          </label>
          <select
            value={branch || ""}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-medium
                       border-2 border-black bg-yellow-200
                       shadow-[1px_1px_0px_black] sm:shadow-[2px_2px_0px_black]
                       focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            <option value="">Select Branch</option>
            {branches &&
              branches.map((b) => (
                <option
                  key={b}
                  value={b}
                  className="px-2 sm:px-4 py-1 sm:py-2 cursor-pointer hover:bg-yellow-300 font-medium break-words whitespace-normal overflow-hidden"
                >
                  {b}
                </option>
              ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        <div>
          <label className="block mb-2 font-bold text-base sm:text-lg">
            Semester
          </label>
          <select
            value={semester || ""}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-medium
                       border-2 border-black bg-green-200
                       shadow-[1px_1px_0px_black] sm:shadow-[2px_2px_0px_black]
                       focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            <option value="">Select Semester</option>
            {semesters &&
              semesters.map((sem) => (
                <option
                  key={sem}
                  value={sem}
                  className="px-2 sm:px-4 py-1 sm:py-2 cursor-pointer hover:bg-yellow-300 font-medium break-words whitespace-normal overflow-hidden"
                >
                  {sem}
                </option>
              ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold
                     bg-pink-200 border-2 border-black
                     shadow-[1px_1px_0px_black] sm:shadow-[3px_3px_0px_black]
                     hover:bg-pink-300 hover:translate-x-[2px] hover:translate-y-[2px]
                     hover:shadow-none transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
