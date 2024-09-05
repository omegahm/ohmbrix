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

import { calcAge, calcDaysUntil } from "../utils/days_until";

import Realistic from "react-canvas-confetti/dist/presets/realistic";

export const Person = ({ name, categories, birthday, details }) => {
  if (birthday.includes("12-24")) {
    birthday = null;
  }

  const dayUntilBirthday = calcDaysUntil(birthday);
  const age = calcAge(birthday);
  const days = dayUntilBirthday === 1 ? "dag" : "dage";

  return (
    <>
      {dayUntilBirthday <= 7 && (
        <Realistic
          autorun={{ speed: 3, delay: 1000, duration: 200 }}
          globalOptions={{
            resize: true,
            useWorker: true,
            disableForReducedMotion: true,
          }}
        />
      )}

      <Typography id={name} variant="h2" component="h1" color="secondary">
        {name}
      </Typography>

      {birthday && (
        <Typography gutterBottom variant="h4" component="h3" color="secondary">
          {`${dayUntilBirthday} ${days} til fødselsdag (${age} år)`}
        </Typography>
      )}

      {details && details.length > 0 && (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="h5" color="secondary">
                  Noter
                </Typography>

                <List>
                  {details.map((detail) => (
                    <ListItem key={detail} variant="body1" disablePadding>
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
