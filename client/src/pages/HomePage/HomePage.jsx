import Table from "../../components/Table/Table";
// import Search from "../../components/Search/Search";
// import { useState } from "react";

function Home() {
  const url_data_route = "getData";
  const collectionName = "Exploits";

  // const [searchText, setSearchText] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);

  // const handleSearch = (text, page) => {
  //   setSearchText(text);
  //   setPageNumber(page);
  // };

  return (
    <>
      {/* <Search onSearch={handleSearch} /> */}
      <Table
        url_data_route={url_data_route}
        collectionName={collectionName}
        // searchText={searchText}
        // pageNumber={pageNumber}
      />
    </>
  );
}

export default Home;
