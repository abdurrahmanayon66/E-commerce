"use client";
import React, { useState } from "react";
import Tab from "./Tab";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import PaymentTransactions from "./PaymentTransactions";
const Profile = () => {
  const [tabValue, setTabValue] = useState<string>("personal");

  const tabOptions = [
    { value: "personal", label: "Personal" },
    { value: "address", label: "Address" },
    { value: "transactions", label: "Transactions" },
  ];

  return (
    <div>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-semibold text-text-primary ">Profile</h1>
        <h3 className="text-base text-text-secondary">
          Manage your account settings and preferences.
        </h3>
      </div>

      <div className="my-10">
        <Tab
          options={tabOptions}
          value={tabValue}
          onValueChange={setTabValue}
        />
      </div>

      <div className="mt-6">
        {tabValue === "personal" && <PersonalInfo />}
        {tabValue === "address" && <AddressInfo />}
        {tabValue === "transactions" && <PaymentTransactions userType="customer" />}
      </div>
    </div>
  );
};

export default Profile;
