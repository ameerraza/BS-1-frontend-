import React, { useState, useEffect } from "react";
import { InputField } from "../common/InputField";
import { Button } from "../common/Button";
import ModalLayout from "../common/ModelLayout";

interface CategoryFormProps {
  isOpen: boolean;
  onSubmit?: any;
  onClose: () => void;
  initialData?: {
    name: string;
    description: string;
    status: string;
    _id: string;
  };
}

interface CategoryFormData {
  name: string;
  description: string;
  status: string;
  _id?: string;
}

const CategoryForm = ({
  isOpen,
  onSubmit,
  onClose,
  initialData,
}: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    status: "Active",
  });
  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});

  useEffect(() => {
    // Reset form when modal opens/closes
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        status: "Active",
      });
      setErrors({});
    } else if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        status: initialData.status,
        _id: initialData._id,
      });
    }
  }, [isOpen, initialData]);

  const validateForm = () => {
    const newErrors: Partial<CategoryFormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-lg"
      height="h-auto"
    >
      <div className="py-4">
        <h2 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="name"
            label="Category Name"
            required
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
          />
          <InputField
            area
            name="description"
            label="Description"
            required
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={errors.description}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
              type="button"
              className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default CategoryForm;
