"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { authSignUp, getAllUsers } from "@/api/api";
import useToastStore from "@/stores/toastStore";
import { InputField } from "../../../../components/common/InputField";
import { Button } from "../../../../components/common/Button";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phoneNumber?: string;
}

const AdminPage = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [admins, setAdmins] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    showLoader();
    try {
      const response = await getAllUsers();
      if (response.success) {
        // Filter users with Admin role
        const adminUsers = response.data
          .filter((user: User) => user.role === "Admin")
          .map((admin: User, index: number) => ({
            ...admin,
            no: index + 1,
          }));
        setAdmins(adminUsers);
      } else {
        showToast("Failed to fetch admin users", "error");
      }
    } catch (error) {
      showToast("Error fetching admin users", "error");
      console.error(error);
    } finally {
      hideLoader();
    }
  };
  const adminColumns = [
    { key: "no", header: "No" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phoneNumber", header: "Phone" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: User) => (
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit (can be implemented later)
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle delete (can be implemented later)
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primaryDash">Manage Admins</h1>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Add New Admin
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <DynamicTable columns={adminColumns} data={admins} />
      </div>

      {isModalOpen && (
        <AdminModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchAdmins();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

const AdminModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    CNIC: "",
  });

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Username validation
    if (!formData.name) {
      newErrors.name = "Username is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact validation
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{11}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid 11-digit contact number";
    }

    // CNIC validation
    if (!formData.CNIC) {
      newErrors.CNIC = "CNIC is required";
    } else if (!/^\d{13}$/.test(formData.CNIC)) {
      newErrors.CNIC = "Please enter a valid 13-digit CNIC number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessages(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errorMessages[name]) {
      setErrorMessages((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fill all required fields correctly", "error");
      return;
    }

    const formattedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: `+92${formData.contact.substring(1)}`,
      cnic: formData.CNIC,
      role: "Admin", // Set the role to Admin
    };

    try {
      showLoader();
      const response = await authSignUp(formattedData);
      if (response.success === true) {
        showToast("Admin added successfully!", "success");
        onSuccess();
      } else {
        showToast("Failed to add admin. Please try again.", "error");
      }
    } catch (error) {
      showToast("An error occurred while adding admin", "error");
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primaryDash">
            Add New Admin
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="space-y-1">
            <div>
              <InputField
                name="name"
                label="Username"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter admin name"
                required
              />
              {errorMessages.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages.name}
                </p>
              )}
            </div>
            <div>
              <InputField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errorMessages.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages.email}
                </p>
              )}
            </div>
            <div>
              <InputField
                name="contact"
                label="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
              {errorMessages.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages.contact}
                </p>
              )}
            </div>
            <div>
              <InputField
                name="CNIC"
                label="CNIC"
                value={formData.CNIC}
                onChange={handleChange}
                placeholder="Enter CNIC number"
                required
              />
              {errorMessages.CNIC && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages.CNIC}
                </p>
              )}
            </div>
            <div>
              <InputField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errorMessages.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessages.password}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex gap-4 justify-end">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Add Admin
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
