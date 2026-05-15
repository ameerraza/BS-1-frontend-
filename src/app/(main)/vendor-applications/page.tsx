"use client";

import { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiCheck, HiX } from "react-icons/hi"; // Add these imports
import { Button } from "../../../../components/common/Button";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import VendorApplicationDetailModel from "../../../../components/Vendor/VendorApplicationDetailModel";
import { acceptVendorRequest, getVendorRequests } from "@/api/api";
import useToastStore from "@/stores/toastStore";
import { useLoaderStore } from "@/stores/useLoaderStore";

export default function VendorApplicationsPage() {
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorRequests, setVendorRequests] = useState<any>([]);
  const handleViewDetails = (row: any) => {
    setSelectedVendor({
      ...row,
      companyName: row.companyName,
      ownerName: row.ownerFullName,
      email: row.businessEmail,
      phone: row.contactNumber,
      address: row.businessAddress,
      city: row.city,
      businessType: row.businessType,
      productTypes: row.typesOfProducts,
      taxNumber: row.taxRegistrationNumber,
      businessLicense: row.businessLicense,
      cnicNumber: row.cnicNumber,
      cnicFrontImage: row.cnicFrontImage,
      cnicBackImage: row.cnicBackImage,
      status: row.status,
    });
    setIsModalOpen(true);
  };

  const handleAccept = async (row: any) => {
    showLoader();
    const response = await acceptVendorRequest(row.id);
    if (response.success == true) {
      showToast("Vendor request accepted successfully", "success");
      doGetVendorRequests();
    } else {
      showToast("Failed to accept vendor request", "error");
      hideLoader();
    }
    hideLoader();
  };

  const columns = [
    { key: "companyName", header: "Company Name" },
    { key: "ownerFullName", header: "Owner Name" },
    { key: "businessEmail", header: "Email" },
    { key: "contactNumber", header: "Phone" },
    { key: "city", header: "City" },
    { key: "businessType", header: "Business Type" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex space-x-2">
          <div
            className="text-black cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row);
            }}
          >
            <HiEye className="h-6 w-6" />
          </div>
          {row.status === "Pending" && (
            <>
              <div
                className="text-green-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept(row);
                }}
              >
                <HiCheck className="h-6 w-6" />
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    doGetVendorRequests();
  }, []);
  const doGetVendorRequests = async () => {
    showLoader();
    const response = await getVendorRequests();
    if (response.success == true) {
      setVendorRequests([...response.vendorRequests].reverse());
      // showToast("Vendor requests fetched successfully", "success");
      hideLoader();
    } else {
      showToast("Failed to fetch vendor requests", "error");
      hideLoader();
    }
    hideLoader();
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Vendor Applications</h1>
      <DynamicTable data={vendorRequests} columns={columns} />

      {selectedVendor && (
        <VendorApplicationDetailModel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vendorData={selectedVendor}
        />
      )}
    </div>
  );
}
