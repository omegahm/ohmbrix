import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Icon,
} from "@mui/material";
import { useTheme } from "@emotion/react";

function Wish({ title, url, image }) {
  const theme = useTheme();

  const placeholder =
    "https://pbs.twimg.com/media/CQyFt-xWEAA571_?format=png&name=small";

  function goToLink(event) {
    if (!url) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank").focus();
    } else {
      window.location.assign(url);
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardActionArea onClick={goToLink}>
          <CardMedia image={image || placeholder} title={title} />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h3">
              {url && (
                <Icon
                  sx={{
                    marginRight: theme.spacing(1),
                    verticalAlign: "text-bottom",
                  }}
                  fontSize="small"
                >
                  link
                </Icon>
              )}
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default Wish;
