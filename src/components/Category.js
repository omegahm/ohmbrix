import React from "react";
import { Typography, Grid } from "@mui/material";
import Wish from "./Wish";

function Category({ title, wishes }) {
  return (
    <>
      <Typography variant="h3" component="h2">
        {title}
      </Typography>
      <Grid container spacing={3}>
        {wishes.map((wish, idx) => (
          <Wish key={`wish-${idx}`} {...wish} />
        ))}
      </Grid>
    </>
  );
}

export default Category;
