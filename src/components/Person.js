import React from "react";
import { Divider, Typography } from "@mui/material";
import Category from "./Category";
import { calcDaysUntil } from "../utils/days_until";

function Person({ name, categories, birthday }) {
  const dayUntilBirthday = calcDaysUntil(birthday);

  return (
    <>
      <Typography id={name} variant="h2" component="h1" color="secondary">
        {name}
        {birthday &&
          ` - ${dayUntilBirthday} dag${
            dayUntilBirthday === 1 ? "" : "e"
          } til fødselsdag`}
      </Typography>

      {categories.map((category, idx) => (
        <Category key={`category-${idx}`} {...category} />
      ))}
      <Divider />
    </>
  );
}

export default Person;
