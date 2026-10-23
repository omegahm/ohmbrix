import React from "react";

import { Grid, Typography } from "@mui/material";
import { Wish } from "./Wish";

export const Category = ({ title, wishes }) => (
  <>
    <Typography variant="h3" component="h3">
      {title}
    </Typography>

    <Grid container spacing={3}>
      {wishes.map((wish, idx) => (
        <Wish key={idx} {...wish} />
      ))}
    </Grid>
  </>
);
