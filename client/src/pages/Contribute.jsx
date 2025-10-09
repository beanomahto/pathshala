import React, { useEffect, useState } from "react";
import axios from "axios";

const Contribute = () => {
  const [semesters, setSemesters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);
  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    semester: "",
    branch: "",
    subject: "",
    year: "",
    type: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) return alert("Please upload a file!");

    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      uploadData.append(key, value)
    );

    try {
      const res = await axios.post("/api/upload", uploadData, {
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select Type</option>
            {types.map((tp) => (
              <option key={tp} value={tp}>
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
