import React from "react";
import ReactDOM from "react-dom";
import { useCoinData } from './utils/hooks';
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import "./styles.scss";

const App = () => {
  const [coinData] = useCoinData()

  return (
    <div className="App">
      <Navbar />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);