import React, { useState, useEffect } from "react";
import {
  AppBar,
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

let theme = createTheme({});
theme = createTheme({
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
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: 0,
          paddingTop: "56.25%", // 16:9
          backgroundSize: "contain",
          margin: theme.spacing(2),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flexGrow: 1,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(3),
        },
      },
    },
  },
});

function App() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const data = await loadData();

      setContent(
        data.map((person, idx) => <Person key={`person-${idx}`} {...person} />)
      );

      setLoading(false);
    }
    
    fetchData();
  }, [setContent, setLoading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            Vores Ønsker
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="xl">
          {loading ? <LoadingContent /> : content}
        </Container>
      </main>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default App;