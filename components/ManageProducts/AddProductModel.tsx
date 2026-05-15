import React, { useState, useEffect } from "react";
import ModalLayout from "../common/ModelLayout";
import { InputField } from "../common/InputField";
import Dropdown from "../common/Dropdown";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import {
  addProduct,
  getAllCategories,
  updateProduct,
  uploadImages,
} from "@/api/api";
import ImageUploader from "./ImageUploader";
import Cookies from "js-cookie";
// Add constants for dropdown options
const LISTING_TYPE_OPTIONS = [
  { value: "both", label: "Both (Rent & Buy)" },
  { value: "rent", label: "Rent Only" },
  { value: "buy", label: "Buy Only" },
];

const CONDITION_OPTIONS = [
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
  { value: "Poor", label: "Poor" },
];

interface EditableProduct {
  id: string;
  name: string;
  category: { _id: string; name: string };
  location: string;
  specs: string;
  condition: string;
  price: string;
  rentPrice: string;
  images: string[];
}

interface AddProductModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  itemToEdit?: EditableProduct;
}

const AddProductModel = ({ isOpen, onClose, onSuccess, itemToEdit }: any) => {
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();

  const initialFormState = {
    name: "",
    category: "",
    location: "",
    description: "",
    condition: "",
    price: "",
    rentPrice: "",
    listingType: "both",
    images: [],
  };
  console.log("itemToEdit :>> ", itemToEdit);
  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState<any[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const resetForm = () => {
    setFormData(initialFormState);
    setBase64Images([]);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name || "",
        category: itemToEdit.category._id || "", // Use category ID instead of name
        location: itemToEdit.location || "",
        description: itemToEdit.specs || "",
        condition: itemToEdit.condition || "",
        price: itemToEdit.price || "",
        rentPrice: itemToEdit.rentPrice || "",
        listingType: "both",
        images: [],
      });
      // Set existing images separately
      setExistingImages(itemToEdit.images || []);
      setBase64Images([]);
    } else {
      resetForm();
      setExistingImages([]);
    }
  }, [itemToEdit]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const cleanBase64String = (base64String: string) => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const handleImageUpload = async (files: File[]) => {
    if (files && files.length > 0) {
      try {
        const base64Promises = files.map((file) => convertToBase64(file));
        const base64Results = await Promise.all(base64Promises);

        setBase64Images(base64Results);
        setFormData((prev: any) => ({
          ...prev,
          images: files,
        }));
      } catch (error) {
        showToast("Error processing images. Please try again.", "error");
      }
    } else {
      showToast("Please upload only image files", "error");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.success) {
        // Transform categories to use ID as value but show name as label
        const formattedCategories = response.categories.map((cat: any) => ({
          value: cat._id, // Use ID as value
          label: cat.name, // Show name in dropdown
          description: cat.description,
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      showToast("Error loading categories", "error");
    }
  };

  const handleuploadImages = async (file: any) => {
    try {
      const base64Promises = cleanBase64String(file);
      const base64Results = await uploadImages(base64Promises);

      return base64Results.url;
    } catch (error) {
      showToast("Error processing images. Please try again.", "error");
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    showLoader();
    try {
      // Handle new uploaded images
      const newImageUrls = await Promise.all(
        base64Images.map(async (base64Image) => {
          const cleanedBase64 = await handleuploadImages(base64Image);
          return cleanedBase64;
        })
      );

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      const productData = {
        vendorId: Cookies.get("id") || "",
        name: formData.name,
        category: formData.category, // This will now be the category ID
        location: formData.location,
        description: formData.description,
        condition: formData.condition,
        price: formData.price ? parseFloat(formData.price) : 0,
        rentPrice: formData.rentPrice ? parseFloat(formData.rentPrice) : 0,
        images: allImages,
      };

      let response;
      if (itemToEdit) {
        response = await updateProduct(itemToEdit.id, productData);
      } else {
        response = await addProduct(productData);
      }

      if (response.success) {
        showToast(
          `Product ${itemToEdit ? "updated" : "added"} successfully!`,
          "success"
        );
        resetForm();
        await onSuccess(); // Add this line
        onClose();
      } else {
        showToast(response.message || "Operation failed", "error");
      }
    } catch (error: any) {
      console.error("Error during operation:", error);
      showToast(error.message || "An error occurred", "error");
    } finally {
      hideLoader();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle pricing fields
    if (name === "price" || name === "rentPrice") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    // Handle regular fields
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">
          {itemToEdit ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Title"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Dropdown
            label="Category"
            options={categories}
            value={formData.category}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            placeholder="Select category"
          />

          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <InputField
            label="Specifications"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            area
          />

          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              label="Condition"
              options={CONDITION_OPTIONS}
              value={formData.condition}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, condition: value }))
              }
              placeholder="Select condition"
            />
          </div>

          <Dropdown
            label="Listing Type"
            options={LISTING_TYPE_OPTIONS}
            value={formData.listingType}
            onChange={(value) => {
              setFormData((prev: any) => ({
                ...prev,
                listingType: value,
                price: value === "rent" ? "" : prev.price,
                rentPrice: value === "buy" ? "" : prev.rentPrice,
              }));
            }}
            placeholder="Select listing type"
          />

          <div className="grid grid-cols-2 gap-4">
            {(formData.listingType === "both" ||
              formData.listingType === "buy") && (
              <InputField
                label="Buy Price (PKR)"
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
                required={formData.listingType === "buy"}
                min="0"
              />
            )}

            {(formData.listingType === "both" ||
              formData.listingType === "rent") && (
              <InputField
                label="Rent Price (PKR/month)"
                name="rentPrice"
                type="number"
                value={formData.rentPrice || ""}
                onChange={handleChange}
                required={formData.listingType === "rent"}
                min="0"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <ImageUploader
              onImageUpload={(files: File[]) => {
                handleImageUpload(files);
              }}
              existingImages={existingImages}
              onRemoveExistingImage={handleRemoveExistingImage}
            />
            {/* Display newly uploaded images preview */}
            <div className="flex flex-wrap gap-4 mt-4">
              {base64Images.map((img, index) => (
                <div key={`new-${index}`} className="relative">
                  <img
                    src={img}
                    alt={`New upload ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBase64Images((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  ></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {itemToEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddProductModel;
