import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Category from "./Category";
import { calcDaysUntil, calcAge } from "../utils/days_until";

function Person({ name, categories, birthday, details }) {
  console.log(details);
  if (birthday.includes("12-24")) {
    birthday = null;
  }

  const dayUntilBirthday = calcDaysUntil(birthday);
  const age = calcAge(birthday);

  return (
    <>
      <Typography id={name} variant="h2" component="h1" color="secondary">
        {name}
      </Typography>

      {birthday && (
        <Typography gutterBottom variant="h4" component="h3" color="secondary">
          {`${dayUntilBirthday} dag${
            dayUntilBirthday === 1 ? "" : "e"
          } til fødselsdag (`}
          {age}
          {` år)`}
        </Typography>
      )}

      {details && details.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="h5" color="secondary">
                  Noter
                </Typography>
                {details.map((detail) => (
                  <Typography variant="body1" component="h3">
                    {detail}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {categories.map((category, idx) => (
        <Category key={`category-${idx}`} {...category} />
      ))}
    </>
  );
}

export default Person;
