import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

function Home() {
  const url_data_route = "getData";
  const collectionName = "Exploits";
  return (
    <>
      <Search />
      <Table url_data_route={url_data_route} collectionName={collectionName} />
    </>
  );
}

export default Home;
