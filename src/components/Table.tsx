import { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

import { TableData } from "../types";

type TableProps = {
  data: TableData;
};

export default function Table({ data }: TableProps) {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (field: string, sortType: string) => {
    const sortedData = tableData.rows.sort((a, b) => {
      if (a[field] < b[field]) {
        return sortType === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortType === "asc" ? 1 : -1;
      }
      return 0;
    });

    const data = {
      ...tableData,
      columns: tableData.columns.map((column) => {
        if (column.field === field) {
          return {
            ...column,
            sort: sortType === "asc" ? "desc" : "asc",
          };
        }
        return column;
      }),
      rows: sortedData,
    };

    setTableData(data);
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {tableData.columns.map((column) => (
            <th
              key={column.field}
              style={{ width: column.width }}
              className="border-white border-2 cursor-pointer"
              onClick={() => handleSort(column.field, column.sort)}
            >
              <div className="flex">
                {column.label}
                {column.sort === "asc" ? (
                  <ArrowUpIcon className="h-5 w-5 ml-2" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 ml-2" />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.length === 0 ? (
          <tr>
            <td colSpan={tableData.columns.length} className="text-center">
              No data
            </td>
          </tr>
        ) : (
          tableData.rows.map((row) => (
            <tr key={row.name}>
              {tableData.columns.map((column) => (
                <td key={column.field} className="border-white border-2">
                  {row[column.field]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
