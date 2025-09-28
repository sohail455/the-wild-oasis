import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterName="status"
        filterOptions={[
          { query: "all", value: "All" },
          { query: "checked-out", value: "Checked out" },
          { query: "checked-in", value: "Checked in" },
          { query: "unconfirmed", value: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", lable: "Sort by date (recent first)" },
          { value: "startDate-asc", lable: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            lable: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", lable: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
