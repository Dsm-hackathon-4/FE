import { createContext, useContext, useState } from "react";

interface SolveStats {
  correctCount: number;
  totalCount: number;
  totalXp: number;
  addResult: (isCorrect: boolean, xp: number) => void;
  reset: () => void;
}

const SolveStatsContext = createContext<SolveStats>({
  correctCount: 0,
  totalCount: 0,
  totalXp: 0,
  addResult: () => {},
  reset: () => {},
});

export const SolveStatsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const addResult = (isCorrect: boolean, xp: number) => {
    setTotalCount((prev) => prev + 1);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
    setTotalXp((prev) => prev + xp);
  };

  const reset = () => {
    setCorrectCount(0);
    setTotalCount(0);
    setTotalXp(0);
  };

  return (
    <SolveStatsContext.Provider
      value={{ correctCount, totalCount, totalXp, addResult, reset }}
    >
      {children}
    </SolveStatsContext.Provider>
  );
};

export const useSolveStats = () => useContext(SolveStatsContext);
