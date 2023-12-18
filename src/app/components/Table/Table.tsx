import { HTMLAttributes } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { twMerge } from "tailwind-merge";

interface TableProperties<T> {
  columns: ColumnDef<T>[];
  data: T[];
  row: (data: T) => JSX.Element;
}

export const TableRow = ({ children }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="border-t border-theme-gray-200 first:border-none">
    {children}
  </tr>
);

export const TableCell = ({
  children,
  className,
}: HTMLAttributes<HTMLTableCellElement>) => (
  <td className={twMerge("py-3 align-top lg:align-middle", className)}>
    {children}
  </td>
);

export function Table<T>({ data, columns, row }: TableProperties<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="px-6 pb-6">
      <table className="table-auto w-full">
        <thead className="relative before:absolute before:content-[' '] before:h-full before:block before:bg-theme-gray-50 before:-left-6 before:w-6 before:border-t before:border-t-theme-gray-200 after:absolute after:content-[' '] after:h-full after:block after:bg-theme-gray-50 after:-right-6 after:w-6 after:border-t after:border-t-theme-gray-200 after:top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-theme-gray-50 border-t border-t-theme-gray-200"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className={twMerge(
                      "text-theme-gray-500 text-sm font-medium leading-[125%] py-3",
                      // @ts-ignore
                      header.column.columnDef.className as string,
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((rowModel) => ({
            ...row(rowModel.original),
            key: rowModel.id,
          }))}
        </tbody>
      </table>
    </div>
  );
}
