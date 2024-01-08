import { Route, Routes } from "react-router-dom";
import HistoryPage from "./components/HistoryPage";
import Calculator from "./components/calculator";
import { useState, useEffect } from "react";


const App = () => {
    const [calcHistory, setCalcHistory] = useState<string[]>([]);
  
    useEffect(() => {
      const savedCalcHistory = localStorage.getItem("calcHistory");
      if (savedCalcHistory) {
        setCalcHistory(JSON.parse(savedCalcHistory));
      }
    }, []);
  
    const onClearHistory = () => {
      setCalcHistory([]); // Clear the calcHistory array
      localStorage.removeItem("calcHistory");
    };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route
          path="/history"
          element={<HistoryPage calcHistory={calcHistory} onClearHistory={onClearHistory} />}
        />
      </Routes>
    </div>
  );
};

export default App;
