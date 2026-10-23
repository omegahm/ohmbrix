import React from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

export const LoadingContent = () => (
  <>
    <Typography variant="h2" component="h2" color="secondary">
      <Skeleton width="60%" />
    </Typography>

    <Typography variant="h3" component="h3">
      <Skeleton width="20%" />
    </Typography>

    <Grid container spacing={3}>
      {Array(12)
        .fill("")
        .map((_, idx) => (
          <Grid key={`grid-${idx}`} size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
            <Card variant="outlined" sx={{ borderColor: "grey.300" }}>
              <Box sx={{ height: 200, p: 2 }}>
                <Skeleton variant="rectangular" height="100%" />
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body1" component="h4">
                  <Skeleton width="70%" />
                </Typography>
              </CardContent>

              <Box
                sx={{
                  p: "5px",
                  borderTop: 1,
                  borderColor: "grey.300",
                }}
              >
                <Typography variant="button" component="div">
                  <Skeleton width="40%" sx={{ mx: "auto" }} />
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
    </Grid>
  </>
);
