import React, { useEffect, useState } from "react";
import { filterUsers, searchProfile } from "../services/service";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import FilterDropdown from "./FilterDropdown";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [serchedName, setSerchedName] = useState("");

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (serchedName) => {
    try {
      if (serchedName) {
        const payload = serchedName ? { name: serchedName } : {};
        const response = await searchProfile(payload);
        console.log("Search results:", response.data.profiles);
        setAllUsers(response?.data.users);
        setSerchedName("");
      } else {
        const response = await searchProfile();
        setAllUsers(response?.data.users);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSerchedName("");
    }
  };

  // Handle filter change from the FilterDropdown
  const handleFilterChange = async (newFilters) => {
    try {
      const response = await filterUsers(newFilters);
      setAllUsers(response?.data.filteredUsers);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReload = async (reload) => {
    try {
      const response = await filterUsers(reload);
      setAllUsers(response?.data.filteredUsers);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>Home</div>
      <IconButton onClick={() => handleSearch(serchedName)}>
        <SearchIcon />
      </IconButton>
      <input
        placeholder="search.."
        onChange={(e) => setSerchedName(e.target.value)}
        value={serchedName}
      />
      <FilterDropdown onFilter={handleFilterChange} onReload={handleReload} />
      <br />
      {allUsers?.length > 0 &&
        allUsers?.map((item, index) => (
          <div
            key={index}
            style={{
              height: "460px",
              width: "460px",
              border: "2px solid black",
            }}
          >
            <p>Name : {item.name}</p>
            <p>JobTitle : {item.jobTitle}</p>
            <img
              src={item.profileImage}
              alt="profileImage"
              style={{ height: "350px", width: "410px" }}
            />
          </div>
        ))}
    </div>
  );
};

export default Home;
