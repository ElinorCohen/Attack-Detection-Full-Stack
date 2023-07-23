import Search from "../../components/Search/Search";
import Table from "../../components/Table/Table";
// import { Wrapper } from "./AttackHistory.style";
import { HistoryData } from "../../data/history_data.js";
import { useState } from "react";

function History() {
  const [currentPage, setCurrentPage] = useState(1); // Initial page

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the page state with the new page value
  };

  return (
    <>
      <Search />
      <Table
        data={HistoryData}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default History;
