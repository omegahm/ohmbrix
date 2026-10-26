import React from "react";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";

const placeholder =
  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%22 y=%2250%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22central%22>🎁</text></svg>";

const layout = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  height: "100%",
};

export const Wish = ({ title, url, image }) => {
  let urlName = "";
  try {
    if (url) {
      urlName = new URL(url).hostname.replace(/^www\./, "");
    }
  } catch {
    console.error(`Couldn't parse "${url}"`);
  }

  const content = (
    <>
      <CardMedia
        component="img"
        image={image || placeholder}
        alt=""
        loading="lazy"
        sx={{
          width: "100%",
          height: { xs: 240, sm: 180 },
          flexShrink: 0,
          p: 2,
        }}
      />
      <Box
        sx={{
          p: 2,
          pt: 0,
          flexGrow: 1,
          minWidth: 0,
          overflowWrap: "anywhere",
        }}
      >
        <Typography variant="body1" component="h4">
          {title}
        </Typography>
      </Box>
    </>
  );

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card>
        {url ? (
          <CardActionArea
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            sx={layout}
          >
            {content}
          </CardActionArea>
        ) : (
          <Box sx={layout}>{content}</Box>
        )}

        {url && (
          <Button
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LinkIcon />}
            sx={{
              minHeight: 48,
              borderTop: 1,
              borderColor: "divider",
              borderRadius: 0,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {urlName}
          </Button>
        )}
      </Card>
    </Grid>
  );
};
