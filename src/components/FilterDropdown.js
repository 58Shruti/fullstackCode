import React, { useState } from "react";

const mockData = {
  education: ["High School", "Bachelor's", "Master's", "PhD"],
  jobTitle: ["Software Engineer", "Doctor", "Teacher", "Designer"],
};

const FilterDropdown = ({ onFilter, onReload }) => {
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const handleFilter = () => {
    onFilter({ education: selectedEducation, jobTitle: selectedJobTitle });
  };
  
  const handleReload = () => {
    setSelectedEducation("");
    setSelectedJobTitle("");
    onReload({ education: "", jobTitle: "" });
  };

  return (
    <div>
      <label>Education Level:</label>
      <select
        value={selectedEducation}
        onChange={(e) => setSelectedEducation(e.target.value)}
      >
        <option value="">Select Education</option>
        {mockData.education.map((edu) => (
          <option key={edu} value={edu}>
            {edu}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label>Job Title:</label>
      <select
        value={selectedJobTitle}
        onChange={(e) => setSelectedJobTitle(e.target.value)}
      >
        <option value="">Select Job Title</option>
        {mockData.jobTitle.map((job) => (
          <option key={job} value={job}>
            {job}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleReload}>Reload</button>
    </div>
  );
};

export default FilterDropdown;
