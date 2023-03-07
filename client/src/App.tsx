import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    throw new Error("test");
  }, []);
  return <div>Hello word</div>;
}

export default App;
