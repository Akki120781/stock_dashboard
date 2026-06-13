import React from "react";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
