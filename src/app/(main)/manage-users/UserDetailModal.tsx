import React, { useState } from "react";

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

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (userId: string, updatedData: Partial<User>) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(user._id, editedUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={editedUser.phoneNumber || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={editedUser.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            {editedUser.role === "Client" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Client Status
                </label>
                <select
                  name="clientStatus"
                  value={editedUser.clientStatus}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
            {editedUser.role === "Vendor" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Vendor Status
                </label>
                <select
                  name="vendorStatus"
                  value={editedUser.vendorStatus}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
