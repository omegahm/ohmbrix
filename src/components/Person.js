import React from "react";
import { Typography } from "@mui/material";
import Category from "./Category";
import { calcDaysUntil } from "../utils/days_until";

function Person({ name, categories, birthday }) {
  const dayUntilBirthday = calcDaysUntil(birthday);

  return (
    <>
      <Typography id={name} variant="h2" component="h1" color="secondary">
        {name}
      </Typography>
      {birthday && (
        <Typography variant="h4" component="h3" color="secondary">
          {`${dayUntilBirthday} dag${dayUntilBirthday === 1 ? "" : "e"} til
          fødselsdag`}
        </Typography>
      )}

      {categories.map((category, idx) => (
        <Category key={`category-${idx}`} {...category} />
      ))}
    </>
  );
}

export default Person;
