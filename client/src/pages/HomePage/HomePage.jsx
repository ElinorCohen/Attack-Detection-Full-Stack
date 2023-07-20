import { useState } from "react";

import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";
import { myData } from "../../data/exploits_data";

function Home() {
  const [currentPage, setCurrentPage] = useState(1); // Initial page

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the page state with the new page value
  };
  return (
    <>
      <Search />
      <Table data={myData} page={currentPage} onPageChange={handlePageChange} />
    </>
  );
}

export default Home;
