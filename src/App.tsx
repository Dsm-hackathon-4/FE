import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles, theme } from "@/themes";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
