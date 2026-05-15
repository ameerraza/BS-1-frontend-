import React, { useState } from "react";
import { Order } from "@/types/order";
import ModalLayout from "../../../../components/common/ModelLayout";
import {
  FiPackage,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiFile,
} from "react-icons/fi";

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdate: (orderId: string, updatedData: Partial<Order>) => void;
  isOpen: boolean;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdate,
  isOpen,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleStatusChange = (newStatus: string) => {
    onUpdate(order._id, { status: newStatus });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-blue-100 text-blue-800",
      Shipped: "bg-purple-100 text-purple-800",
      Delivered: "bg-green-100 text-green-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <ModalLayout isOpen={isOpen} onClose={onClose} width="max-w-4xl">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FiPackage className="text-blue-600" />
                <h3 className="font-bold text-lg">Product Information</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {order.productId.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span> $
                  {order.productPrice}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FiUser className="text-blue-600" />
                <h3 className="font-bold text-lg">Customer Information</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span> {order.fullName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {order.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span>{" "}
                  {order.phoneNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address}, {order.city}
                </p>
              </div>
            </div>

            {/* Rental Period */}
            {order.type === "rent" && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FiCalendar className="text-blue-600" />
                  <h3 className="font-bold text-lg">Rental Period</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Start Date:</span>{" "}
                    {new Date(order.startDate!).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">End Date:</span>{" "}
                    {new Date(order.endDate!).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {/* Payment Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <FiCreditCard className="text-blue-600" />
                <h3 className="font-bold text-lg">Payment Details</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  {order.transactionId}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Product Price:</span> $
                  {order.productPrice}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Delivery:</span> $
                  {order.deliveryCharges}
                </p>
                <p className="text-gray-700 font-bold">
                  Total Amount: ${order.totalAmount}
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 p-4 rounded-lg col-span-full">
              <div className="flex items-center gap-2 mb-3">
                <FiFile className="text-blue-600" />
                <h3 className="font-bold text-lg">Payment Receipt</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="group relative">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={order.receiptImage}
                      alt="Payment Receipt"
                      className="w-full h-48 object-cover cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setSelectedImage(order.receiptImage)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-gray-50 p-4 rounded-lg col-span-full">
              <h3 className="font-bold text-lg mb-3">Order Status</h3>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[
                    "Pending",
                    "Confirmed",
                    "Shipped",
                    "Delivered",
                    "Completed",
                    "Cancelled",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </ModalLayout>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] p-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailModal;
