import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>{count}</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
