import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useFormatRupiah from "../hooks/useFormatRupiah";
import useTruncate from "../hooks/useTruncate";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";

// Daftar kolom untuk tabel
const columns = [
  {
    key: "name",
    label: "Item Name",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "stock",
    label: "In Stock",
  },
  {
    key: "type",
    label: "Item Type",
  },
  {
    key: "description",
    label: "Item Desc",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TablePaginate({ allBarang }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const { formatRupiah } = useFormatRupiah();
  const [filterType, setFilterType] = useState("All");

  const { truncate } = useTruncate();

  const filteredItems = useMemo(() => {
    if (filterType === "All") {
      return allBarang;
    }
    return allBarang.filter((item) => item.type === filterType);
  }, [filterType, allBarang]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const deleteBarangById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await supabase
            .from("product")
            .delete()
            .eq("id", id)
            .select();

          if (data) {
            window.location.reload();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <label htmlFor="type-filter"></label>
        <select
          id="type-filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Foods</option>
          <option value="Drink">Drinks</option>
        </select>
      </div>

      <Table
        aria-label="Table with filter and pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          {columns.map((col) => (
            <TableColumn key={col.key}>{col.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {columnKey === "action" ? (
                    <div className="relative flex items-center gap-3">
                      <Link to={`/detail/${item.id}`}>
                        <Tooltip content="Detail">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                          </span>
                        </Tooltip>
                      </Link>
                      <Link to={`/edit/${item.id}`}>
                        <Tooltip content="Edit">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                          </span>
                        </Tooltip>
                      </Link>
                      <Tooltip color="danger" content="Delete">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => deleteBarangById(item.id)}
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  ) : columnKey === "price" ? (
                    formatRupiah(getKeyValue(item, columnKey))
                  ) : columnKey === "type" ? (
                    <span className="capitalize">
                      {getKeyValue(item, columnKey)}
                    </span>
                  ) : columnKey === "description" ? (
                    truncate(getKeyValue(item, columnKey), 20)
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}