"use client";
import React, { useState, useEffect } from "react";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import { FaEye } from "react-icons/fa";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import OrderDetailModal from "./OrderDetailModal";
import { getAllOrders, updateOrder } from "@/api/api";
import { Order } from "@/types/order";
import Cookies from "js-cookie";
const Page: React.FC = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [activeTab, setActiveTab] = useState("rent");
  const [rentOrders, setRentOrders] = useState<Order[]>([]);
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderColumns = [
    { key: "no", header: "No" },
    {
      key: "productId",
      header: "Product",
      render: (row: Order) => (row.productId ? row.productId.name : "N/A"),
    },
    {
      key: "fullName",
      header: "Customer Name",
    },
    {
      key: "totalAmount",
      header: "Amount",
      render: (row: Order) => `$${row.totalAmount}`,
    },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Date",
      render: (row: Order) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: Order) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedOrder(row);
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye size={18} />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    doGetOrders();
  }, []);

  const doGetOrders = async () => {
    showLoader();
    try {
      const response = await getAllOrders();
      if (response.success == true) {
        const userId = Cookies.get("id");
        const userRole = Cookies.get("role");

        let filteredOrders = response.orders;

        // Filter orders for vendors to only show their own orders
        if (userRole === "vendor") {
          filteredOrders = response.orders.filter(
            (order: Order) => order.vendorId._id === userId
          );
        }

        const allOrders = filteredOrders.map((order: Order) => ({
          ...order,
          createdAt: new Date(order.createdAt).toLocaleDateString(),
        }));

        const rentOrdersList = allOrders.filter(
          (order: Order) => order.type === "rent"
        );
        const buyOrdersList = allOrders.filter(
          (order: Order) => order.type === "buy"
        );

        setRentOrders(rentOrdersList);
        setBuyOrders(buyOrdersList);
      } else {
        showToast("Failed to fetch orders", "error");
      }
    } catch (error) {
      // showToast("Error fetching orders", "error");
    } finally {
      hideLoader();
    }
  };
  const handleUpdate = async (orderId: string, updatedData: Partial<Order>) => {
    showLoader();
    try {
      const response = await updateOrder(orderId, updatedData);
      if (response.success) {
        showToast("Order updated successfully", "success");
        doGetOrders();
        setIsModalOpen(false);
      } else {
        showToast("Failed to update order", "error");
      }
    } catch (error) {
      showToast("Error updating order", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="">
      <div className="mb-8">
        <div className="flex gap-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "rent" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("rent")}
          >
            Rent Orders
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "buy" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("buy")}
          >
            Buy Orders
          </button>
        </div>
      </div>

      <div className="mb-4">
        {activeTab === "rent" ? (
          <div className="mb-4">
            <DynamicTable columns={orderColumns} data={rentOrders} />
          </div>
        ) : (
          <div className="mb-4">
            <DynamicTable columns={orderColumns} data={buyOrders} />
          </div>
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onUpdate={handleUpdate}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Page;
