import React from "react";
import AdminPanelPage from "@/pages/AdminPanelPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute adminOnly={true}>
      <AdminPanelPage />
    </ProtectedRoute>
  );
}
