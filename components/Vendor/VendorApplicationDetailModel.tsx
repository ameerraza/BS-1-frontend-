import React from "react";
import ModalLayout from "../common/ModelLayout";
import Image from "next/image";

interface VendorApplicationDetailModelProps {
  isOpen: boolean;
  onClose: () => void;
  vendorData: {
    companyName: string;
    ownerFullName: string;
    businessEmail: string;
    contactNumber: string;
    businessAddress: string;
    city: string;
    businessType: string;
    typesOfProducts: string;
    taxRegistrationNumber: string;
    businessLicense: string;
    cnicNumber: string;
    cnicFrontImage: string;
    cnicBackImage: string;
    status: string;
    createdAt: string;
  };
}

const VendorApplicationDetailModel: React.FC<
  VendorApplicationDetailModelProps
> = ({ isOpen, onClose, vendorData }) => {
  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-2 gap-4 border-b py-3">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );

  const DocumentPreview = ({ label, url }: { label: string; url: string }) => (
    <div className="grid grid-cols-2 gap-4 border-b py-3">
      <span className="font-semibold text-gray-700">{label}:</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        View Document
      </a>
    </div>
  );

  const ImagePreview = ({ label, url }: { label: string; url: string }) => (
    <div className="grid grid-cols-2 gap-4 border-b py-3">
      <span className="font-semibold text-gray-700">{label}:</span>
      <div className="relative h-32 w-48">
        <img
          src={url}
          alt={label}
          style={{ objectFit: "contain" }}
          className="rounded-lg"
        />
      </div>
    </div>
  );

  const vendorDetails = [
    { label: "Company Name", value: vendorData.companyName },
    { label: "Owner Name", value: vendorData.ownerFullName },
    { label: "Email", value: vendorData.businessEmail },
    { label: "Phone", value: vendorData.contactNumber },
    { label: "Address", value: vendorData.businessAddress },
    { label: "City", value: vendorData.city },
    { label: "Business Type", value: vendorData.businessType },
    { label: "Product Types", value: vendorData.typesOfProducts },
    {
      label: "Tax Registration Number",
      value: vendorData.taxRegistrationNumber,
    },
    { label: "CNIC Number", value: vendorData.cnicNumber },
    { label: "Status", value: vendorData.status },
    {
      label: "Applied On",
      value: new Date(vendorData.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} width="max-w-3xl">
      <div className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Vendor Application Details
        </h2>

        <div className="space-y-2">
          {vendorDetails.map((detail, index) => (
            <DetailRow key={index} label={detail.label} value={detail.value} />
          ))}

          <DocumentPreview
            label="Business License"
            url={vendorData.businessLicense}
          />

          <DocumentPreview label="CNIC Front" url={vendorData.cnicFrontImage} />

          <DocumentPreview label="CNIC Back" url={vendorData.cnicBackImage} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default VendorApplicationDetailModel;
