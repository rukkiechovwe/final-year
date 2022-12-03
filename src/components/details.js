import * as React from "react";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import Breadcrumb from "./common/breadcrumb";

export default function Detail({
  prevTitle,
  prev,
  activeTitle,
  active,
  children,
}) {
  return (
    <div>
      <Breadcrumb
        prevTitle={prevTitle}
        prev={prev}
        activeTitle={activeTitle}
        active={active}
      />
      <Card>
        <CardHeader title="Details" />
        <CardContent>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
