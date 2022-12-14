import * as React from "react";
import { Breadcrumbs, Link } from "@mui/material";

export default function Breadcrumb({ prevTitle, prev, activeTitle, active }) {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 5 }}>
        <Link underline="hover" color="inherit" to={prev}>
          {prevTitle}
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          to={active}
          aria-current="page"
        >
          {activeTitle}
        </Link>
      </Breadcrumbs>
    </div>
  );
}
