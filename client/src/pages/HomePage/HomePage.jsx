import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

function Home() {
  const url_data_route = "getData";

  return (
    <>
      <Search />
      <Table url_data_route={url_data_route} />
    </>
  );
}

export default Home;
