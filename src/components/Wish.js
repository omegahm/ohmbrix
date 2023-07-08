import React from "react";
import {
  Button,
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

  let urlName = "";
  try {
    if (url) {
      urlName = new URL(url).hostname.replace(/^www./, "").replace(/\..*$/, "");
    }
  } catch (e) {
    console.error(`Couldn't parse "${url}"`);
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card variant="outlined" style={{ borderColor: theme.palette.grey[300] }}>
        <CardActionArea onClick={goToLink}>
          <CardMedia
            component="img"
            height="200"
            image={image || placeholder}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h3">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {url && (
          <Button
            onClick={goToLink}
            size="small"
            style={{
              padding: 5,
              borderTopWidth: "1px",
              borderTopStyle: "solid",
              borderTopColor: theme.palette.grey[300],
              borderRadius: 0,
            }}
          >
            <Icon
              sx={{
                marginRight: theme.spacing(1),
                verticalAlign: "text-bottom",
              }}
              fontSize="small"
            >
              link
            </Icon>
            {urlName}
          </Button>
        )}
      </Card>
    </Grid>
  );
}

export default Wish;
