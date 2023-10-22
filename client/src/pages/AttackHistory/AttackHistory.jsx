import Table from "../../components/Table/Table";
// import { Wrapper } from "./AttackHistory.style";

function History() {
  const url_data_route = "getHistoryData";
  const collectionName = "Users";

  return (
    <>
      <Table url_data_route={url_data_route} collectionName={collectionName} />
    </>
  );
}

export default History;
