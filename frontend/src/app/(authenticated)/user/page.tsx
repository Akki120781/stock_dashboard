import React from "react";
import UserPanelPage from "@/pages/UserPanelPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <UserPanelPage />
    </ProtectedRoute>
  );
}
