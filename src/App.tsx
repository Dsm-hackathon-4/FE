import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles, theme } from "@/themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
