import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Person from "./components/Person";
import LoadingContent from "./components/LoadingContent";

import loadData from "./utils/api";
import { calcDaysUntil } from "./utils/days_until";

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
      styleOverrides: (themeParam) => ({
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

function App() {
  const [content, setContent] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const data = await loadData();
      setNames(data.map((person) => person.name));

      setContent(
        data
          .sort((a, b) => {
            if (a.birthday === undefined) {
              return 1;
            }
            if (b.birthday === undefined) {
              return -1;
            }
            return calcDaysUntil(a.birthday) - calcDaysUntil(b.birthday);
          })
          .map((person, idx) => <Person key={`person-${idx}`} {...person} />)
      );

      setLoading(false);
    }

    fetchData();
  }, [setContent, setLoading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            Vores Ønsker
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "space-around", sm: "end" },
            }}
          >
            {names.map((name) => (
              <Button
                key={name}
                onClick={() => {
                  let elem = document.getElementById(`${name}`);
                  window.scrollTo({
                    behavior: "smooth",
                    top: elem.offsetTop - 70,
                  });
                }}
                sx={{
                  minWidth: { xs: 55, sm: 64 },
                  color: "white",
                  display: "block",
                  fontSize: { xs: 7, sm: 14 },
                  fontFamily: "Permanent Marker",
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <main style={{ marginTop: 70 }}>
        <Container maxWidth={false}>
          {loading ? <LoadingContent /> : content}
        </Container>
      </main>

      <Backdrop open={loading}>
        <CircularProgress size={100} variant="indeterminate" color="primary" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;
