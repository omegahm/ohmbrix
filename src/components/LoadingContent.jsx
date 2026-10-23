import React from "react";

import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";

export const LoadingContent = () => (
  <>
    <Typography variant="h2" component="h1" color="secondary">
      <Skeleton width="60%" />
    </Typography>

    <Typography variant="h3" component="h2">
      <Skeleton width="20%" />
    </Typography>

    <Grid container spacing={3}>
      {Array(12)
        .fill("")
        .map((_, idx) => (
          <Grid key={`grid-${idx}`} item xs={12} sm={6} md={3} xl={2}>
            <Card>
              <Skeleton sx={{ height: 190 }} variant="rectangular" />

              <CardContent>
                <Typography gutterBottom variant="body1" component="h3">
                  <Skeleton width="30%" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  </>
);
