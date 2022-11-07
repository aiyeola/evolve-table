import Table from "./components/Table";
import { TableData } from "./types";

export default function App() {
  const data: TableData = {
    columns: [
      {
        label: "Product Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Seller",
        field: "seller",
        sort: "asc",
        width: 270,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 200,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Pineapple",
        seller: "Iris West",
        price: 100,
        quantity: 2,
      },
      {
        name: "Apple",
        seller: "Cisco Ramon",
        price: 250,
        quantity: 7,
      },
      {
        name: "Orange",
        seller: "Harrison Wells",
        price: 200,
        quantity: 2,
      },
      {
        name: "Peach",
        seller: "Barry Allen",
        price: 400,
        quantity: 7,
      },
    ],
  };

  return (
    <>
      <Table data={data} />
    </>
  );
}
