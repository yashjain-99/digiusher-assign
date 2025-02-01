import { useState } from "react";
import "./App.css";
import { DataTable } from "./components/DataTable";
import Filters from "./components/Filters";

function App() {
  const [filter, setFilter] = useState<Record<Filter, string>>({
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
      <Filters filter={filter} setFilter={setFilter} />
      <DataTable filter={filter} />
    </main>
  );
}

export default App;
