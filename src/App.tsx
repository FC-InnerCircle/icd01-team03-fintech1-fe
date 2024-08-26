import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import tw from "twin.macro";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div css={tw`text-center`}>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} css={tw`h-24 p-6`} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} css={tw`h-24 p-6`} alt="React logo" />
        </a>
        <h1 css={tw`text-3xl font-bold`}>Vite + React</h1>
        <div css={tw`mt-4`}>
          <button
            type="button"
            css={tw`px-4 py-2 bg-blue-500 text-white rounded`}
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
          <p css={tw`mt-4`}>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p css={tw`mt-4 text-gray-500`}>Click on the Vite and React logos to learn more</p>
      </div>
    </>
  );
}

export default App;
