"use client";
import React, { useState, useEffect } from "react";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { getAllUsers, deleteUser, updateUser } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import UserDetailModal from "./UserDetailModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phoneNumber?: string;
  clientStatus: string;
  vendorStatus: string;
}

const Page: React.FC = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [vendors, setVendors] = useState<User[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Column definitions for users
  const userColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phoneNumber", header: "Phone" },
    { key: "clientStatus", header: "Client Status" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: User) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Column definitions for vendors
  const vendorColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phoneNumber", header: "Phone" },
    { key: "vendorStatus", header: "Vendor Status" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: User) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(row);
              setIsModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
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
    doGetUsers();
  }, []);

  const doGetUsers = async () => {
    showLoader();
    try {
      const response = await getAllUsers();
      if (response.success == true) {
        // Separate users and vendors
        const allUsers = response.data.map((user: User, index: number) => ({
          ...user,
        }));

        const clientUsers = allUsers.filter(
          (user: User) => user.role === "Client"
        );
        const vendorUsers = allUsers.filter(
          (user: User) => user.role === "Vendor"
        );

        setUsers(clientUsers);
        setVendors(vendorUsers);
        // showToast("Users fetched successfully", "success");
      } else {
        showToast("Failed to fetch users", "error");
      }
    } catch (error) {
      showToast("Error fetching users", "error");
    } finally {
      hideLoader();
    }
  };

  const handleDelete = async (userId: string) => {
    showLoader();
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        showToast("User deleted successfully", "success");
        doGetUsers(); // Refresh the users list
      } else {
        showToast("Failed to delete user", "error");
      }
    } catch (error) {
      showToast("Error deleting user", "error");
    } finally {
      hideLoader();
    }
  };

  const handleUpdate = async (userId: string, updatedData: Partial<User>) => {
    showLoader();
    try {
      const response = await updateUser(userId, updatedData);
      if (response.success) {
        showToast("User updated successfully", "success");
        doGetUsers(); // Refresh the users list
        setIsModalOpen(false);
      } else {
        showToast("Failed to update user", "error");
      }
    } catch (error) {
      showToast("Error updating user", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="">
      <div className="mb-8">
        <div className="flex gap-4 border-b">
          <button
            className={`px-4 py-2 ${
              activeTab === "users" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Clients
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "vendors" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("vendors")}
          >
            Vendors
          </button>
        </div>
      </div>

      <div className="mb-4">
        {activeTab === "users" ? (
          <div className="mb-4">
            <DynamicTable columns={userColumns} data={users} />
          </div>
        ) : (
          <div className="mb-4">
            <DynamicTable columns={vendorColumns} data={vendors} />
          </div>
        )}
      </div>

      {isModalOpen && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Page;
