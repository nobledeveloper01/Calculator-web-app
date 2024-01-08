import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HistoryPage from "./HistoryPage";

const Calculator: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [calcHistory, setCalcHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);


  const specialChars = ["%", "*", "/", "-", "+", "="];

  const buttons = [
    "AC",
    "DEL",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    "00",
    ".",
    "=",
  ];

  const calculate = (btnValue: string) => {
    let newOutput = output;
    let newHistory = [...calcHistory];

    if (btnValue === "=" && typeof newOutput === "string" && newOutput !== "") {
      newOutput = eval(newOutput.replace("%", "/100"));
      newHistory = [...newHistory, `${output} = ${newOutput}`];
    } else if (btnValue === "AC") {
      newOutput = "";
    } else if (btnValue === "DEL") {
      newOutput = newOutput.toString().slice(0, -1);
    } else {
      if (typeof newOutput !== "string" && specialChars.includes(btnValue))
        return;
      newOutput += btnValue;
    }

    localStorage.setItem("calcHistory", JSON.stringify(newHistory));

    setOutput(newOutput);
    setCalcHistory(newHistory);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      setCalcHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleViewHistory = () => {
    setShowHistory((prevShowHistory) => !prevShowHistory);
  };

  const handleClearHistory = () => {
    setCalcHistory([]);
    localStorage.removeItem("calcHistory");
  };
  

  return (
    <div className=" overflow-auto">
      <button
        type="button"
        onClick={handleViewHistory}
        className="mb-5 py-2 px-4 bg-green-700 rounded-md text-white border border-white"
      >
        {showHistory ? "Close History" : "View History"}
      </button>

      <motion.div
        initial={{ x: "100%" }}
        animate={showHistory ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "30%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {showHistory && (
          <HistoryPage
            calcHistory={calcHistory}
            onClearHistory={handleClearHistory}
          />
        )}
      </motion.div>

      <div className="container calculator overflow-hidden">
        <div className="calculator-display">
          <input
            placeholder="none"
            type="text"
            className="display"
            value={output}
            readOnly
          />
        </div>
        <div className="buttons">
          {buttons.map((btn, index) => (
            <button
              type="button"
              key={index}
              onClick={() => calculate(btn)}
              className={specialChars.includes(btn) ? "operator" : ""}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
