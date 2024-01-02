import React from "react";
import Pagination from "@mui/material/Pagination";

export default function CustomPagination({pages, activePage, onPageChange}) {
  return (
    <div className="pagination-container">
      <Pagination
        count={pages}
        page={activePage}
        onChange={onPageChange}
        color="primary"
        size="large"
        sx={{
          background: "white",
          padding: "10px",
          borderRadius: "20px",
          display: "inline-block",
        }}
      />
    </div>
  );
}
