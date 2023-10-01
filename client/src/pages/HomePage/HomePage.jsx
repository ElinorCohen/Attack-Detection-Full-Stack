import { useState } from "react";

import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initial page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from MongoDB Atlas when the page changes
    fetchDataForPage(currentPage);
  }, [currentPage]);

  const fetchDataForPage = async (page) => {
    try {
      console.log(page);
      // Replace with your MongoDB Atlas API endpoint
      const response = await axios.get(
        `http://localhost:8000/api/User/getData/${page}`
      );
      console.log("Response:", response);
      // Assuming the response contains an array of data
      setData(response.data);
      if (response.data.length > 0) setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the page state with the new page value
  };
  return (
    <>
      <Search />
      <Table
        data={data}
        page={currentPage}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </>
  );
}

export default Home;
