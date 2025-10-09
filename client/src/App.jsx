import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Input from "./pages/Input.jsx";
import Output from "./pages/Output.jsx";
import Final from "./pages/Final.jsx";
import Diaries from "./pages/Diaries.jsx";
import AiTutor from "./pages/AiTutor.jsx";
import Contribute from "./pages/Contribute.jsx";

import { createContext, useState } from "react";

export const MyContext = createContext();

const App = () => {
  const [semesters, setSemesters] = useState(null);
  const [semester, setSemester] = useState("");
  const [branches, setBranches] = useState(null);
  const [branch, setBranch] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [subject, setSubject] = useState(null);
  const [data, setData] = useState(null);

  return (
    <div>
      <MyContext.Provider
        value={{
          branch,
          setBranch,
          subjects,
          setSubjects,
          subject,
          setSubject,
          semester,
          setSemester,
          data,
          setData,
          branches,
          setBranches,
          semesters,
          setSemesters,
        }}
      >
        <BrowserRouter>
          <div className="flex h-screen">
            <Sidebar />
            <MainContent />
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button (mobile only) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-yellow-300 border-2 border-black rounded shadow-[3px_3px_0px_black]"
      >
        {/* Hamburger icon */}
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-yellow-300 border-r-4 border-black shadow-[6px_6px_0px_black] transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="p-4 flex items-center">
          <span className="text-lg font-bold">Pathshala</span>
        </div>
        <ul className="mt-6 space-y-4 px-2">
          <li className="p-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-pink-300">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li className="p-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-green-300">
            <Link to="/main" onClick={() => setOpen(false)}>
              Placement Diaries
            </Link>
          </li>
          <li className="p-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-blue-300">
            <Link to="/home" onClick={() => setOpen(false)}>
              PYQ+Syllabus
            </Link>
          </li>
          <li className="p-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] hover:bg-yellow-300">
            <Link to="/AiTutor" onClick={() => setOpen(false)}>
              AI-Tutor
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Sidebar (hover expand) */}
      <div className="hidden md:block group relative h-full bg-yellow-300 text-black transition-all duration-300 w-16 hover:w-56 border-r-4 border-black shadow-[6px_6px_0px_black]">
        <div className="p-4 flex items-center">
          <span className="ml-3 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Pathshala
          </span>
        </div>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_black] hover:bg-pink-300 transition">
            <span>1.</span>
            <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
              <Link to="/">Home</Link>
            </span>
          </li>
          <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_black] hover:bg-green-300 transition">
            <span>2.</span>
            <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
              <Link to="/main">Placement Diaries</Link>
            </span>
          </li>
          <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_black] hover:bg-blue-300 transition">
            <span>3.</span>
            <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
              <Link to="/home">PYQ+Syllabus</Link>
            </span>
          </li>
          <li className="flex items-center p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_black] hover:bg-yellow-300 transition">
            <span>4.</span>
            <span className="ml-3 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-500">
              <Link to="/AiTutor">AI-Tutor</Link>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};
const MainContent = () => {
  return (
    <div
      className="flex-1 min-h-screen overflow-y-auto 
                 p-4 sm:p-6 md:p-8 
                 bg-pink-200 border-l-4 border-black 
                 shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      {/* 🔹 Routed content box */}
      <div
        className="rounded-xl bg-white border-4 border-black 
                   shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
      >
        {/* 🔹 Top-right links */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-4 bg-white border-4 border-black shadow-[6px_6px_0px_black] rounded-xl px-4 py-2">
            <Link
              to="https://github.com/beanomahto"
              className="text-black font-bold hover:underline hover:bg-yellow-300 transition-colors"
            >
              Developer
            </Link>
            <Link
              to="/upload"
              className="text-black font-bold hover:underline hover:bg-yellow-300 transition-colors"
            >
              Contribute
            </Link>
          </div>
        </div>

        {/* 🔹 Routed pages */}
        <div className="p-4 sm:p-6 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Input />} />
            <Route path="/main" element={<Diaries />} />
            <Route path="/home/:semester/:branch" element={<Output />} />
            <Route
              path="/home/:semester/:branch/:subject"
              element={<Final />}
            />
            <Route path="/AiTutor" element={<AiTutor />} />
            {/* <Route path="/developer" element={<Developer />} /> */}
            <Route path="/upload" element={<Contribute />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
