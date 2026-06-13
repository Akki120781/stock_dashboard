import React from "react";
import StockDetailsPage from "@/pages/StockDetailsPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <StockDetailsPage />
    </ProtectedRoute>
  );
}
