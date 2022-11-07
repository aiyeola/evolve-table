import { describe, expect, it } from "vitest";

import { render, screen, fireEvent } from "../utils/test-utils";
import Table from "../components/Table";
import { TableData } from "../types";
import spliceIntoChunks from "../utils/spliceIntoChunks";

describe("Sample table", () => {
  it("no data is provided", () => {
    render(<Table data={{ columns: [], rows: [] }} />);
    expect(screen.getByText("No data")).toBeVisible();
  });

  it("data is provided", () => {
    render(<Table data={data} />);

    data.columns.forEach((th, idx) => {
      expect(th.label).toBe(
        screen.getAllByRole("columnheader")[idx].textContent
      );
    });

    data.rows.forEach((row, rowIndex) => {
      data.columns.forEach((column, colIndex) => {
        const textContents = screen
          .getAllByRole("cell")
          .map((cell) => cell.textContent);
        const chunks = spliceIntoChunks(textContents, 4);

        expect(row[column.field].toString()).toBe(chunks[rowIndex][colIndex]);
      });
    });
  });

  it("sorts data", () => {
    render(<Table data={data} />);

    const priceHeader = screen.getAllByRole("columnheader")[2];
    fireEvent.click(priceHeader);

    const priceCells = screen
      .getAllByRole("cell")
      .map((cell) => cell.textContent);
    const chunks = spliceIntoChunks(priceCells, 4);
    const prices = chunks.map((chunk) => chunk[2]);

    expect(prices).toEqual(["100", "200", "250", "400"]);
  });
});

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
