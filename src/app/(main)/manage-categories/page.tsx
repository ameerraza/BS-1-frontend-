"use client";
import React, { useState, useEffect } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../../../../components/common/Button";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import CategoryForm from "../../../../components/ManageCategories/CategoryForm";
import SubCategoryForm from "../../../../components/ManageCategories/SubCategoryForm";
import { _descriptors } from "chart.js/helpers";
import {
  addCategory,
  deleteCategory,
  EditCategory,
  getAllCategories,
  getCategoryById,
  getSubCategoryById,
} from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";

interface SubcategoryFormData {
  name: string;
  image: File | null;
  description: string;
  categoryId: string;
}
interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory: {
    _id: string;
    name: string;
    description: string;
    status: string;
  } | null;
  status: string;
  createdAt: string;
}

interface Subcategory {
  _id: string;
  name: string;
  description: string;
  parentCategory: {
    _id: string;
    name: string;
  };
  image?: string;
  status: string;
}

const Page: React.FC = () => {
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [isClient, setIsClient] = useState(false);

  const [activeTab, setActiveTab] = useState("categories");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [itemToEdit, setItemToEdit] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Column definitions for categories
  const categoryColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Name" },
    { key: "description", header: "Description" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Column definitions for subcategories
  const subcategoryColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Name" },
    {
      key: "parentCategory",
      header: "Parent Category",
      render: (row: any) => row.parentCategory.name,
    },
    { key: "description", header: "Description" },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];
  const doGetCategories = async () => {
    showLoader();
    const response: any = await getAllCategories();
    if (response.success === true) {
      const formatedCategories = response.categories
        .filter((item: any) => item.parentCategory == null)
        .map((cat: any, index: any) => ({
          no: index + 1,
          name: cat.name,
          description: cat.description,
          status: cat.status,
          _id: cat._id,
          parentCategory: cat.parentCategory,
        }));
      setCategories(formatedCategories);
      hideLoader();
    } else {
      showToast("Failed to fetch categories", "error");
      hideLoader();
    }
    hideLoader();
  };

  const doGetSubCategories = async () => {
    showLoader();
    let response: any;
    if (selectedCategory) {
      response = await getSubCategoryById(selectedCategory);
    } else {
      response = await getAllCategories();
    }

    if (response.success === true) {
      if (selectedCategory) {
        setSubcategories([response.category]);
      } else {
        const formatedCategories = response.categories
          .filter((item: any) => item.parentCategory != null)
          .map((cat: any, index: any) => ({
            no: index + 1,
            name: cat.name,
            description: cat.description,
            status: cat.status,
            _id: cat._id,
            parentCategory: cat.parentCategory,
          }));
        setSubcategories(formatedCategories);
      }
      hideLoader();
    } else {
      showToast("Failed to fetch subcategories", "error");
      hideLoader();
    }
  };

  useEffect(() => {
    doGetCategories();
  }, []);

  useEffect(() => {
    if (activeTab === "subcategories") {
      doGetSubCategories();
    }
  }, [activeTab, selectedCategory]); // Add selectedCategory as dependency

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  const handleCategorySubmit = async (data: {
    name: string;
    _id?: string;
    description: string;
  }) => {
    try {
      showLoader();
      let response;
      if (data._id) {
        response = await EditCategory(data._id, {
          name: data.name,
          description: data.description,
          status: "Active",
        });
      } else {
        response = await addCategory({
          name: data.name,
          description: data.description,
          status: "Active",
        });
      }

      if (response.success === true) {
        showToast(
          `Category ${data._id ? "updated" : "created"} successfully`,
          "success"
        );
        setIsCategoryModalOpen(false);
        setItemToEdit(null);
        doGetCategories();
      } else {
        showToast("Operation failed", "error");
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      hideLoader();
    }
  };

  const handleSubcategorySubmit = async (data: any) => {
    try {
      showLoader();
      if (!data.parentCategory) {
        showToast("Please select a parent category", "error");
        return;
      }

      const formData = {
        name: data.name,
        description: data.description,
        parentCategory: data.parentCategory,
        status: "Active",
      };

      let response;
      if (data._id) {
        response = await EditCategory(data._id, formData);
      } else {
        response = await addCategory(formData);
      }

      if (response.success === true) {
        showToast(
          `Subcategory ${data._id ? "updated" : "created"} successfully`,
          "success"
        );
        setIsSubcategoryModalOpen(false);
        setItemToEdit(null);
        doGetSubCategories();
      } else {
        showToast("Operation failed", "error");
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      hideLoader();
    }
  };

  const handleEdit = (item: any) => {
    if (activeTab === "categories") {
      const categoryData = {
        _id: item._id,
        name: item.name,
        description: item.description,
        status: item.status,
      };
      setItemToEdit(categoryData);
      setIsCategoryModalOpen(true);
    } else {
      const subcategoryData = {
        _id: item._id,
        name: item.name,
        description: item.description,
        parentCategory: item.parentCategory._id,
        status: item.status,
      };
      setItemToEdit(subcategoryData);
      setIsSubcategoryModalOpen(true);
    }
  };

  const handleDelete = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      showLoader();
      const response = await deleteCategory(itemToDelete._id);
      if (response.success === true) {
        showToast("Item deleted successfully", "success");
        if (activeTab === "categories") {
          doGetCategories();
        } else {
          doGetSubCategories();
        }
      } else {
        showToast("Failed to delete item", "error");
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      showToast("An error occurred while deleting", "error");
      console.error("Error deleting item:", error);
    } finally {
      hideLoader();
    }
  };

  // Transform categories for SubcategoryForm
  const transformedCategories = categories.map((cat, index) => ({
    no: index + 1,
    name: cat.name,
    _id: cat._id, // Keep the ID for reference if needed
  }));

  // Update the modal title based on edit mode
  const getModalTitle = () => {
    if (itemToEdit) {
      return activeTab === "categories" ? "Edit Category" : "Edit Subcategory";
    }
    return activeTab === "categories"
      ? "Add New Category"
      : "Add New Subcategory";
  };

  return (
    <div className="">
      {/* Fixed header section */}
      <div className="mb-8">
        {" "}
        {/* Changed from "" to "mb-8" */}
        <div className="flex justify-end gap-4 mb-4">
          <Button onClick={() => setIsCategoryModalOpen(true)}>
            + Add Category
          </Button>
          <Button onClick={() => setIsSubcategoryModalOpen(true)}>
            + Add SubCategory
          </Button>
        </div>
        <div className="flex gap-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "categories" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "subcategories" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("subcategories")}
          >
            Subcategories
          </button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="mb-4">
        {activeTab === "categories" ? (
          <div className="mb-4">
            <DynamicTable columns={categoryColumns} data={categories} />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex-none mb-4">
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories
                  .filter((cat) => !cat.parentCategory)
                  .map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <DynamicTable columns={subcategoryColumns} data={subcategories} />
            </div>
          </div>
        )}
      </div>

      {/* Modal forms at the bottom */}
      <CategoryForm
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setItemToEdit(null);
        }}
        initialData={itemToEdit}
        onSubmit={handleCategorySubmit}
      />
      <SubCategoryForm
        isOpen={isSubcategoryModalOpen}
        onClose={() => {
          setIsSubcategoryModalOpen(false);
          setItemToEdit(null);
        }}
        initialData={itemToEdit}
        categories={categories}
        onSubmit={handleSubcategorySubmit}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
