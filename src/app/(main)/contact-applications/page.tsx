"use client";

import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { DynamicTable } from "../../../../components/common/DynamicTable";
import { getContacts, resolveContactRequest } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";

const ContactApplicationsPage = () => {
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [contactRequests, setContactRequests] = useState<any>([]);

  const handleResolve = async (row: any) => {
    showLoader();
    const response = await resolveContactRequest(row.id);
    if (response.success == true) {
      showToast("Contact request resolved successfully", "success");
      doGetContactRequests();
      hideLoader();
    } else {
      showToast("Failed to resolve contact request", "error");
      hideLoader();
    }
  };

  const columns = [
    {
      key: "fullName",
      header: "Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "topic",
      header: "Topic",
    },
    {
      key: "query",
      header: "Query",
      render: (row: any) => (
        <div className="w-[400px] md:w-[500px]" title={row.query}>
          {row.query}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex space-x-2">
          {row.status === "Pending" && (
            <div
              className="text-green-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleResolve(row);
              }}
            >
              <HiCheck className="h-6 w-6" />
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    doGetContactRequests();
  }, []);

  const doGetContactRequests = async () => {
    showLoader();
    const response = await getContacts();
    if (response.success == true) {
      setContactRequests([...response.contactRequests].reverse());
      // showToast("Contact requests fetched successfully", "success");
      hideLoader();
    } else {
      showToast("Failed to fetch contact requests", "error");
      hideLoader();
    }
    hideLoader();
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Contact Applications</h1>
      <DynamicTable data={contactRequests} columns={columns} />
    </div>
  );
};

export default ContactApplicationsPage;
