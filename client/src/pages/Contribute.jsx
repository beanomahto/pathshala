import React, { useEffect, useState } from "react";
import axios from "axios";

const Contribute = () => {
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState(null);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState([]);
  const [type, setType] = useState([]);
  const types = {
    0: "syllabus",
    1: "mid_1",
    2: "mid_2",
    3: "end",
  };
  const [formData, setFormData] = useState({
    semester: "",
    branch: "",
    subject: "",
    year: "",
    type: "",
    file: null,
  });

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
        const url2 = `${import.meta.env.VITE_API_URL}/api/getYear`;
        const response2 = await axios.get(url2, {});
        setYears(response2.data);
        setYear(response2.data[0]);
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

  const fetchSubjects = async (e) => {
    //e.preventDefault();
    if (branch == null || semester == null) return; // prevent useless calls
    try {
      const url = `${
        import.meta.env.VITE_API_URL
      }/api/getAllSubjects/${semester}/${branch}`;
      const response = await axios.get(url);
      if (response.data) {
        setSubjects(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [branch, semester]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    if (!formData.file) return alert("Please upload a file!");
    e.preventDefault();

    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      uploadData.append(key, value)
    );

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/upload`;
      const res = await axios.post(url, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully for admin approval!");
      setFormData({
        semester: "",
        branch: "",
        subject: "",
        year: "",
        type: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Contribute</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Semester */}
        <div>
          <label className="block mb-1 font-medium">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={(e) => {
              handleChange(e);
              setSemester(e.target.value);
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="block mb-1 font-medium">Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={(e) => {
              handleChange(e);
              setBranch(e.target.value);
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={(e) => {
              handleChange(e);
              setSubject(e.target.value);
            }}
            className="w-full border rounded p-2"
            required
            disabled={!formData.branch || !formData.semester}
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-medium">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={(e) => {
              handleChange(e);
              setYear(e.target.value);
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Year</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => {
              handleChange(e);
              setType(e.target.value);
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Type</option>
            {Object.values(types).map((tp, idx) => (
              <option key={idx} value={tp}>
                {tp}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Upload File (PDF / Image)
          </label>
          <input
            type="file"
            name="file"
            accept="application/pdf,image/*"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-black rounded p-2 hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Contribute;
