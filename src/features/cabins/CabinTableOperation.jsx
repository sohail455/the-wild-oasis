import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterName={"discount"}
        filterOptions={[
          { query: "all", value: "All" },
          { query: "with-disc", value: "With Discount" },
          { query: "without-disc", value: "Without Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", lable: "sort by name (A-Z)" },
          { value: "name-desc", lable: "sort by name (Z-A)" },
          { value: "maxCapacity-asc", lable: "sort by maxCapacity (A-Z)" },
          { value: "maxCapacity-desc", lable: "sort by maxCapacity (Z-A)" },
          { value: "regularPrice-asc", lable: "sort by regularPrice (A-Z)" },
          { value: "regularPrice-desc", lable: "sort by regularPrice (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
