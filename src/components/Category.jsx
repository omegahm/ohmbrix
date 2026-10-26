import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { Wish } from "./Wish";

export const Category = ({ title, wishes }) => (
  <Box component="section" sx={{ mt: 4 }}>
    <Typography variant="h3" component="h3">
      {title}
    </Typography>

    <Grid container spacing={2}>
      {wishes.map((wish, idx) => (
        <Wish key={idx} {...wish} />
      ))}
    </Grid>
  </Box>
);
