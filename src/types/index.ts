export interface TableData {
  columns: {
    label: string;
    field: string;
    sort: string;
    width: number;
  }[];
  rows: {
    name: string;
    seller: string;
    price: number;
    quantity: number;
  }[];
}
