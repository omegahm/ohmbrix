import React, { useEffect, useMemo, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LoadingContent } from "./components/LoadingContent";
import { Person } from "./components/Person";

import { calcDaysUntil } from "./utils/days_until";
import { celebrate } from "./utils/confetti";
import { loadData } from "./utils/api";

const SCROLL_OFFSET = 40;

let theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Permanent Marker", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Permanent Marker", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Permanent Marker", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Permanent Marker", "sans-serif"].join(","),
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        html: {
          "@media (prefers-reduced-motion: no-preference)": {
            scrollBehavior: "smooth",
          },
        },
        body: {
          marginBottom: 30,
        },
      }),
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h2: {
      fontSize: "3.75rem",
      marginTop: "1.5rem",
      [theme.breakpoints.down("md")]: {
        fontSize: "3rem",
      },
    },
    h3: {
      marginTop: "1.5rem",
      marginBottom: "1rem",
    },
    h4: {
      fontSize: "1.25rem",
    },
  },
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: "contain",
          padding: theme.spacing(2),
        },
      },
    },
  },
});

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

const byNextBirthday = (a, b) => {
  if (!a.birthday || !b.birthday) {
    return Boolean(b.birthday) - Boolean(a.birthday);
  }
  return calcDaysUntil(a.birthday) - calcDaysUntil(b.birthday);
};

export const App = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      let data;
      try {
        data = await loadData();
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
        return;
      }

      if (cancelled) {
        return;
      }

      setPeople(data);
      setLoading(false);
      celebrate(data);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    if (loading || !window.location.hash) {
      return;
    }

    const id = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView();
  }, [loading]);

  const names = useMemo(() => people.map((person) => person.name), [people]);
  const sortedPeople = useMemo(() => [...people].sort(byNextBirthday), [people]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary">
        <Toolbar style={{ minHeight: 36 }}>
          <Typography
            variant="h4"
            component="h1"
            color="inherit"
            noWrap
            sx={{
              fontSize: 14,
              [theme.breakpoints.down("sm")]: visuallyHidden,
            }}
          >
            Vores Ønsker
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "space-around", sm: "end" },
              overflowX: "auto",
            }}
          >
            {names.map((name) => (
              <Button
                key={name}
                href={`#${name}`}
                sx={{
                  minWidth: 0,
                  px: { xs: 1, sm: 2 },
                  color: "white",
                  whiteSpace: "nowrap",
                  fontSize: { xs: 13, sm: 14 },
                  fontFamily: "Permanent Marker",
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <main style={{ marginTop: SCROLL_OFFSET }}>
        <canvas
          id="confetti"
          style={{
            position: "fixed",
            top: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth={false}>
          {loading && <LoadingContent />}
          {!loading && error && (
            <>
              <Typography variant="h3" component="h2" color="secondary">
                Kunne ikke hente ønskerne.
              </Typography>
              <Button
                variant="contained"
                onClick={() => setAttempt((n) => n + 1)}
              >
                Prøv igen
              </Button>
            </>
          )}
          {!loading &&
            !error &&
            sortedPeople.map((person) => (
              <Person key={person.name} {...person} />
            ))}
        </Container>
      </main>
    </ThemeProvider>
  );
};
