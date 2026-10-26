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

const SCROLL_OFFSET = 48;
const MARKER = ["Permanent Marker", "sans-serif"].join(",");

let theme = createTheme({
  palette: {
    primary: {
      main: "#3d2b6b",
    },
    background: {
      default: "#e6e6ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f1a2e",
      secondary: "#55506a",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontSize: 16,
    h2: {
      fontFamily: MARKER,
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
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h2: {
      fontSize: "3rem",
      lineHeight: 1.2,
      color: theme.palette.primary.main,
      [theme.breakpoints.down("md")]: {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontSize: "0.95rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(1.5),
    },
  },
  components: {
    MuiCardMedia: {
      styleOverrides: {
        root: {
          objectFit: "contain",
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
  const [activeName, setActiveName] = useState(null);

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

  const sortedPeople = useMemo(
    () => [...people].sort(byNextBirthday),
    [people],
  );
  const names = useMemo(
    () => sortedPeople.map((person) => person.name),
    [sortedPeople],
  );

  useEffect(() => {
    if (loading) {
      return;
    }

    const updateActiveName = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current = sortedPeople[0]?.name ?? null;
      sortedPeople.forEach(({ name }) => {
        const top = document.getElementById(name)?.getBoundingClientRect().top;
        if (atBottom || top <= SCROLL_OFFSET * 2) {
          current = name;
        }
      });
      setActiveName(current);
    };

    updateActiveName();
    window.addEventListener("scroll", updateActiveName, { passive: true });
    window.addEventListener("resize", updateActiveName);

    return () => {
      window.removeEventListener("scroll", updateActiveName);
      window.removeEventListener("resize", updateActiveName);
    };
  }, [loading, sortedPeople]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{ minHeight: SCROLL_OFFSET, px: { xs: 0.5, sm: 2 } }}
        >
          <Typography
            variant="h4"
            component="h1"
            color="inherit"
            noWrap
            sx={{
              fontFamily: MARKER,
              fontSize: 18,
              [theme.breakpoints.down("sm")]: visuallyHidden,
            }}
          >
            Vores Ønsker
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "flex-start", sm: "end" },
              overflowX: "auto",
              "& > :first-of-type": { ml: { xs: "auto", sm: 0 } },
              "& > :last-of-type": { mr: { xs: "auto", sm: 0 } },
            }}
          >
            {names.map((name) => (
              <Button
                key={name}
                href={`#${name}`}
                aria-current={name === activeName ? "location" : undefined}
                sx={{
                  minWidth: 0,
                  minHeight: 40,
                  flexShrink: 0,
                  px: { xs: 0.75, sm: 2 },
                  mx: { xs: 0, sm: 0.25 },
                  borderRadius: 999,
                  color: "white",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  fontSize: { xs: "clamp(12px, 3.6vw, 14px)", sm: 17 },
                  fontFamily: MARKER,
                  transition: "background-color 150ms, color 150ms",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                  "&[aria-current]": {
                    bgcolor: "white",
                    color: "primary.main",
                  },
                }}
              >
                {name.split(" ")[0]}
                <Box
                  component="span"
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    whiteSpace: "pre",
                  }}
                >
                  {name.slice(name.split(" ")[0].length)}
                </Box>
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
        <Container maxWidth="xl">
          {loading && <LoadingContent />}
          {!loading && error && (
            <>
              <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
                Kunne ikke hente ønskerne.
              </Typography>
              <Button
                variant="contained"
                size="large"
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
