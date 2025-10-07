import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../ui/SortBy";

function CabinTable() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  else if (filterValue === "without-disc")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  else if (filterValue === "with-disc")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [value, type] = sortBy.split("-");
  console.log(value, type);
  const x = type === "asc" ? 1 : -1;
  filteredCabins?.sort((a, b) => (a[value] - b[value]) * x);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
