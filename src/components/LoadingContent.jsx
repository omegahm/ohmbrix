import React from "react";

import { Box, Card, Grid, Skeleton, Typography } from "@mui/material";

export const LoadingContent = () => (
  <Box sx={{ pt: 6 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="h2" component="h2" sx={{ width: "40%" }}>
        <Skeleton />
      </Typography>
      <Skeleton variant="rounded" width={200} height={36} />
    </Box>

    <Typography variant="h3" component="h3" sx={{ mt: 4 }}>
      <Skeleton width="20%" />
    </Typography>

    <Grid container spacing={2}>
      {Array(12)
        .fill("")
        .map((_, idx) => (
          <Grid key={`grid-${idx}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card>
              <Box
                sx={{
                  height: { xs: 240, sm: 180 },
                  flexShrink: 0,
                  p: 2,
                }}
              >
                <Skeleton variant="rounded" height="100%" />
              </Box>

              <Box
                sx={{
                  p: 2,
                  pt: 0,
                  flexGrow: 1,
                }}
              >
                <Typography variant="body1" component="div">
                  <Skeleton width="80%" />
                </Typography>
              </Box>

              <Box
                sx={{
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Skeleton width="40%" />
              </Box>
            </Card>
          </Grid>
        ))}
    </Grid>
  </Box>
);
