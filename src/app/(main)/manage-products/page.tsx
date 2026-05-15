"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Button } from "../../../../components/common/Button";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import AddProductModel from "../../../../components/ManageProducts/AddProductModel";
import { getAllProducts, deleteProduct, updateProduct } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import ProductDetailsModal from "../../../../components/ManageProducts/ProductDetailsModal";
import Cookies from "js-cookie";
interface Product {
  _id: string;
  name: string;
  description: string;
  category: {
    name: string;
    description: string;
  } | null;
  condition: string;
  price: number;
  rentPrice: number;
  images: string[];
  status: string;
  location: string;
}

const Page = () => {
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Product Name" },
    {
      key: "category",
      header: "Category",
      render: (row: Product) => row.category?.name || "N/A",
    },
    {
      key: "price",
      header: "Buy Price",
      render: (row: Product) => (row.price ? `$${row.price}` : "Not for sale"),
    },
    {
      key: "rentPrice",
      header: "Rent Price",
      render: (row: Product) =>
        row.rentPrice ? `PKR${row.rentPrice}/day` : "Not for rent",
    },
    { key: "condition", header: "Condition" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: Product) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
            className="text-green-500 hover:text-green-700"
          >
            <FaEye size={18} />
          </button>
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    showLoader();
    try {
      const response: any = await getAllProducts();
      if (response.success) {
        const userId = Cookies.get("id");
        const userRole = Cookies.get("role");

        if (userRole === "vendor") {
          // Filter products - show only the vendor's own products
          const filteredProducts = response.products.filter(
            (product: any) => product.vendorId?._id === userId
          );
          setProducts(filteredProducts.reverse());
        } else {
          // Admin or other role - show all products
          setProducts(response.products.reverse());
        }
      }
    } catch (error) {
      showToast("Error loading products", "error");
    } finally {
      hideLoader();
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    const mappedProduct: any = {
      id: product._id,
      name: product.name,
      category: { name: product.category?.name || "" },
      location: product.location,
      specs: product.description,
      condition: product.condition,
      price: product.price.toString(),
      rentPrice: product.rentPrice.toString(),
      images: product.images,
    };
    setItemToEdit(mappedProduct);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      showLoader();
      try {
        const response = await deleteProduct(product._id);
        if (response.success == true) {
          showToast("Product deleted successfully", "success");
          await fetchProducts();
        } else {
          showToast("Failed to delete product", "error");
        }
      } catch (error) {
        showToast("Error deleting product", "error");
      } finally {
        hideLoader();
      }
    }
  };

  const handleProductUpdate = async () => {
    await fetchProducts();
    setIsAddModalOpen(false);
    setItemToEdit(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex justify-end mb-2">
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Product</Button>
        </div>

        <DynamicTable
          height="h-[65dvh]"
          columns={productColumns}
          data={products.map((product, index) => ({
            ...product,
            no: index + 1,
          }))}
        />
      </div>

      <AddProductModel
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setItemToEdit(null);
        }}
        onSuccess={handleProductUpdate}
        itemToEdit={itemToEdit}
      />

      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </div>
  );
};

export default Page;
