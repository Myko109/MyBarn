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
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { supabase } from "../utils/SupaClient";

export default function ModalAddBarang({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    stock: "",
    description: "",
    image: "",
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
      const { data } = await supabase.from("product").insert(formData).select();

      if (data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your items has been stored!",
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

  const jenisBarang = [
    {
      key: "Food",
      value: "Foods",
    },
    {
      key: "Drink",
      value: "Drinks",
    },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Item
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label onSubmit={handleSubmit}>
                  Name Item
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-custom"
                  />
                </label>
                <label>
                  Price/pcs
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="outline-none"
                  />
                </label>
                <label>
                  Stock
                  <Input
                    type="number"
                    radius="sm"
                    required
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Type
                  <Select
                    required
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    {jenisBarang.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </Select>
                </label>
                <label>
                  Item Description
                  <Textarea
                    radius="sm"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea-custom"
                  />
                </label>
                <label>
                  Image
                  <Input type="text" radius="sm" />
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
