import React from "react";

import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Category } from "./Category";

import { calcAge, calcDaysUntil, isChristmas } from "../utils/days_until";

export const Person = ({ name, categories, birthday, details }) => {
  const showBirthday = Boolean(birthday) && !isChristmas(birthday);
  const dayUntilBirthday = showBirthday ? calcDaysUntil(birthday) : null;
  const age = showBirthday ? calcAge(birthday) : null;
  const days = dayUntilBirthday === 1 ? "dag" : "dage";

  return (
    <>
      <Typography
        id={name}
        variant="h2"
        component="h2"
        color="secondary"
        sx={{ scrollMarginTop: 40 }}
      >
        {name}
      </Typography>

      {showBirthday && (
        <Typography gutterBottom variant="h4" component="p" color="secondary">
          {dayUntilBirthday === 0
            ? `Fødselsdag i dag (${age} år)`
            : `${dayUntilBirthday} ${days} til fødselsdag (${age} år)`}
        </Typography>
      )}

      {details && details.length > 0 && (
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="h4" color="secondary">
                  Noter
                </Typography>

                <List>
                  {details.map((detail) => (
                    <ListItem key={detail} disablePadding>
                      {detail}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {categories.map((category) => (
        <Category key={category.title} {...category} />
      ))}
    </>
  );
};
