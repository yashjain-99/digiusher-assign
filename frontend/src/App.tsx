import { useState } from "react";
import "./App.css";
import Filters from "./components/Filters";

function App() {
  const [data, setData] = useState<Record<Filter, string>>({
    maxCPU: "",
    maxRAM: "",
    minCPU: "",
    minRAM: "",
    cloudProvider: " ",
    region: "EU",
    currency: "EUR",
  });
  return (
    <main className="flex p-4 gap-4 w-full flex-col">
      <Filters data={data} setData={setData} />
    </main>
  );
}

export default App;
