import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

// import * as arrow from "apache-arrow";
import { parseTable } from "arrow-js-ffi";
import { DataType } from "apache-arrow";
import { readParquet, wasmMemory } from "parquet-wasm";

function App() {
  const [count, setCount] = useState(0);

  const readHandler = async () => {
    const WASM_MEMORY = wasmMemory();
    const data = await fetch("http://localhost:8080/download-parquet");
    const buffer = new Uint8Array(await data.arrayBuffer());
    const arrowWasmTable = readParquet(buffer);
    const ffiTable = arrowWasmTable.intoFFI();
    const arrowTable = parseTable(
      WASM_MEMORY.buffer,
      ffiTable.arrayAddrs(),
      ffiTable.schemaAddr()
    );
    const fields = arrowTable.schema.fields;
    const dataArray = arrowTable.toArray();

    fields.forEach((field) => {
      console.log(field.name);
      dataArray.forEach((data) => {
        const val = data[field.name];
        if (DataType.isFloat(val) || DataType.isInt(val)) {
          console.log(Number(val));
        } else {
          console.log(val.toString());
        }
      });
    });
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <button onClick={readHandler}>Read Parquet</button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
