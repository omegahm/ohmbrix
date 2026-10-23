import React from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import { useTheme } from "@mui/material/styles";

const placeholder =
  "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%22 y=%2250%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22central%22>🎁</text></svg>";

export const Wish = ({ title, url, image }) => {
  const theme = useTheme();

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
        alt={title}
        loading="lazy"
        sx={{ height: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="h4">
          {title}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Grid size={{ xs: 12, sm: 6, md: 3, xl: 2 }}>
      <Card variant="outlined" style={{ borderColor: theme.palette.grey[300] }}>
        {url ? (
          <CardActionArea
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            {content}
          </CardActionArea>
        ) : (
          content
        )}

        {url && (
          <Button
            data-url={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            style={{
              padding: 5,
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              borderTopColor: theme.palette.grey[300],
              borderRadius: 0,
            }}
          >
            <LinkIcon
              sx={{
                marginRight: theme.spacing(1),
                verticalAlign: "text-bottom",
              }}
              fontSize="small"
            />
            {urlName}
          </Button>
        )}
      </Card>
    </Grid>
  );
};
