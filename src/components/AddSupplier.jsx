import React from "react";
import Swal from "sweetalert2";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { supabase } from "../utils/SupaClient";

export default function AddSupplyItem({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    supplier_name: "",
    phone_number: "",
    address: "",
    email: "",
    supplier_logo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from("supplier")
        .insert(formData)
        .select();

      if (data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "A new Supplier has been Added!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }

    formData;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Supplier
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label onSubmit={handleSubmit}>
                  Supplier Company
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handleChange}
                    className="input-custom"
                  />
                </label>
                <label>
                  Contact Supplier
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="outline-none"
                  />
                </label>
                <label>
                  Location Supplier
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Email Supplier
                  <Input
                    type="email"
                    radius="sm"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Discard
                </Button>
                <Button color="primary" type="submit">
                  Add to Table
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
