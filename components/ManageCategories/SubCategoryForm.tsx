import React, { useState, useEffect } from "react";
import { InputField } from "../common/InputField";
import { Button } from "../common/Button";
import ModalLayout from "../common/ModelLayout";
import Dropdown from "../common/Dropdown";

interface SubCategoryFormProps {
  isOpen?: any;
  onSubmit?: any;
  onClose?: () => void;
  categories?: any;
  initialData?: any;
}

interface SubCategoryFormData {
  name: string;
  description: string;
  parentCategory: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  parentCategory?: string;
}

const SubCategoryForm = ({
  isOpen,
  onSubmit,
  onClose,
  categories,
  initialData,
}: SubCategoryFormProps) => {
  const [formData, setFormData] = useState<SubCategoryFormData>({
    name: "",
    description: "",
    parentCategory: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Reset form when modal opens/closes
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        parentCategory: "",
      });
      setErrors({});
    } else if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        parentCategory: initialData.parentCategory || "",
      });
    }
  }, [isOpen, initialData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.parentCategory) {
      newErrors.parentCategory = "Parent category is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        ...formData,
        _id: initialData?._id,
      };
      onSubmit(data);
    }
  };

  // Transform categories for Dropdown
  const categoryOptions =
    categories?.map((category: any) => ({
      value: category._id,
      label: category.name,
    })) || [];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-lg"
      height="h-auto"
    >
      <div className="py-4">
        <h2 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Subcategory" : "Add New Subcategory"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="name"
            label="Subcategory Name"
            required
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
          />

          <Dropdown
            label="Parent Category"
            options={categoryOptions}
            value={formData.parentCategory}
            onChange={(value) =>
              setFormData({ ...formData, parentCategory: value })
            }
            placeholder="Select a category"
            // error={errors.parentCategory}
          />

          <InputField
            name="description"
            label="Description"
            value={formData.description}
            onChange={(e: any) =>
              setFormData({ ...formData, description: e.target.value })
            }
            area={true}
            error={errors.description}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              type="button"
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

export default SubCategoryForm;
