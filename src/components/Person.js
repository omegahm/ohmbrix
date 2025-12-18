import React, { useEffect } from "react";

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

import confetti from "canvas-confetti";

export const Person = ({ name, categories, birthday, details }) => {
  if (birthday.includes("12-24")) {
    birthday = null;
  }

  const dayUntilBirthday = calcDaysUntil(birthday);
  const age = calcAge(birthday);
  const days = dayUntilBirthday === 1 ? "dag" : "dage";

  let flagChars = birthday ? ["🇩🇰", "🎂", "🎉"] : ["🎄", "🎅🏻", "❄️", "⛄️"];
  const flags = flagChars.map((char) => {
    return confetti.shapeFromText({
      text: char,
      scalar: 3,
    });
  });

  const flagConfetti = confetti.create(document.querySelector("#confetti"), {
    resize: true,
    useWorker: false,
    disableForReducedMotion: true,
  });

  useEffect(() => {
    if (dayUntilBirthday < 30) {
      flagConfetti({
        particleCount: 200,
        angle: -90,
        spread: 135,
        ticks: 400,
        origin: { x: 0.5, y: -0.3 },
        shapes: flags,
        scalar: 3,
      });
    }
  }, [dayUntilBirthday, flags, flagConfetti]);

  return (
    <>
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
