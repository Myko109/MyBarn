import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";

const columns = [
  {
    key: "supplier_name",
    label: "Supplier",
  },
  {
    key: "phone_number",
    label: "Contact Supplier",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "email",
    label: "Email Supplier",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TableSupply({ allSupply }) {
  const rows = 15;
  const [loading, setLoading] = useState(false);

  const deleteSupplierId = async (id) => {
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
            .from("supplier")
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
      {loading ? (
        <Spinner
          className="justify-center items-center flex mt-48"
          label="Please Wait..."
        />
      ) : (
        <Table className={{ wrapper: "min-h-[222px]" }}>
          <TableHeader>
            {columns.map((col) => (
              <TableColumn key={col.key}>{col.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={allSupply.slice(0, rows)}>
            {(supply) => (
              <TableRow key={supply.id}>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                    {columnKey === "action" ? (
                      <div className="relative flex items-center gap-3">
                        <Link to={`/detailsupply/${supply.id}`}>
                          <Tooltip content="Detail">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EyeIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Tooltip color="danger" content="Delete">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => deleteSupplierId(supply.id)}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </div>
                    ) : (
                      supply[columnKey]
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
