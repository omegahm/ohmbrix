import React from "react";

import { Box, Chip, Typography } from "@mui/material";
import { Category } from "./Category";

import { calcAge, calcDaysUntil, isChristmas } from "../utils/days_until";

export const Person = ({ name, categories, birthday, details }) => {
  const showBirthday = Boolean(birthday) && !isChristmas(birthday);
  const dayUntilBirthday = showBirthday ? calcDaysUntil(birthday) : null;
  const age = showBirthday ? calcAge(birthday) : null;
  const days = dayUntilBirthday === 1 ? "dag" : "dage";
  const isToday = dayUntilBirthday === 0;

  return (
    <Box
      component="section"
      sx={{ pt: 6, pb: 6 }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: 2,
          rowGap: 1,
        }}
      >
        <Typography
          id={name}
          variant="h2"
          component="h2"
          sx={{ scrollMarginTop: 64 }}
        >
          {name}
        </Typography>

        {showBirthday && (
          <Chip
            color="primary"
            variant={isToday ? "filled" : "outlined"}
            label={
              isToday
                ? `🎂 Fødselsdag i dag · ${age} år`
                : `${dayUntilBirthday} ${days} til fødselsdag · ${age} år`
            }
            sx={{
              fontSize: "1rem",
              height: 36,
              bgcolor: isToday ? undefined : "background.paper",
            }}
          />
        )}
      </Box>

      {details && details.length > 0 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            maxWidth: 640,
            bgcolor: "background.paper",
            borderLeft: 4,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
            Noter
          </Typography>

          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {details.map((detail) => (
              <Typography key={detail} component="li" variant="body1">
                {detail}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {categories.map((category) => (
        <Category key={category.title} {...category} />
      ))}
    </Box>
  );
};
