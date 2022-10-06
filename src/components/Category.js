import React from "react";
import { Typography, Grid } from "@mui/material";
import Wish from "./Wish";
import { useTheme } from "@emotion/react";

function Category({ title, wishes }) {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h3" component="h2">
        {title}
      </Typography>
      <Grid
        sx={{ paddingTop: theme.spacing(1), paddingBottom: theme.spacing(8) }}
        container
        spacing={3}
      >
        {wishes.map((wish, idx) => (
          <Wish key={`wish-${idx}`} {...wish} />
        ))}
      </Grid>
    </>
  );
}

export default Category;
