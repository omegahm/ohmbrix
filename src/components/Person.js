import React from "react";
import { Typography } from "@mui/material";
import Category from "./Category";
import { calcDaysUntil, calcAge } from "../utils/days_until";

function Person({ name, categories, birthday }) {
  const dayUntilBirthday = calcDaysUntil(birthday);
  const age = calcAge(birthday);

  return (
    <>
      <Typography id={name} variant="h2" component="h1" color="secondary">
        {name}
      </Typography>
      {birthday && (
        <Typography variant="h4" component="h3" color="secondary">
          {`${dayUntilBirthday} dag${dayUntilBirthday === 1 ? "" : "e"} til
          fødselsdag (`}
          {age}
          {` år)`}
        </Typography>
      )}

      {categories.map((category, idx) => (
        <Category key={`category-${idx}`} {...category} />
      ))}
    </>
  );
}

export default Person;
