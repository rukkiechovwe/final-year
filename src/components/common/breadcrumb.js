import * as React from "react";
import { Breadcrumbs, Link } from "@mui/material";

export default function Breadcrumb({ prevTitle, prev, activeTitle, active }) {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 5 }}>
        <Link underline="hover" color="inherit" href={prev}>
          {prevTitle}
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href={active}
          aria-current="page"
        >
          {activeTitle}
        </Link>
      </Breadcrumbs>
    </div>
  );
}
