import { createContext, useContext, useState } from "react";

const SolveContext = createContext<{
  solveCount: number;
  setSolveCount: React.Dispatch<React.SetStateAction<number>>;
}>({ solveCount: 0, setSolveCount: () => {} });

export const SolveProvider = ({ children }: { children: React.ReactNode }) => {
  const [solveCount, setSolveCount] = useState(0);
  return (
    <SolveContext.Provider value={{ solveCount, setSolveCount }}>
      {children}
    </SolveContext.Provider>
  );
};

export const useSolve = () => {
  const context = useContext(SolveContext);
  return context;
};
