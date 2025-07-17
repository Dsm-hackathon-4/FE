import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles, theme } from "@/themes";
import { Toaster } from "react-hot-toast";
import { SolveProvider } from "@/contexts/SolveContext";
import { SolveStatsProvider } from "@/contexts/SolveStatsContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SolveStatsProvider>
        <SolveProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
          <Toaster />
        </SolveProvider>
      </SolveStatsProvider>
    </ThemeProvider>
  );
}

export default App;
