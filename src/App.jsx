import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setNumber] = useState(false);
  const [isCharacter, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) { string += "0123456789"; };
    if (isCharacter) { string += "!@#$%^&*()_+}{\/"; };

    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * (string.length + 1))
      pass += string.charAt(randomNumber);
    }
    setPassword(pass);
  }, [length, isNumber, isCharacter, setPassword]); // useCallback optimize dependencies.
  useEffect(() => { passwordGenerator() }, [length, isNumber, isCharacter]) // useEffect checks change in dependencies and rerun given function.

  const passwordCopied = useCallback(() => {
    passwordRef.current?.select(); // used to select all passwordRef.
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="flex items-center h-screen">

        <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 bg-neutral-300/60">
          <h1 className="text-neutral-600 text-3xl text-center mb-3">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4" >
            <input type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Never use dictionary word as password."
              readOnly
              ref={passwordRef}
            />
            <button
              className="text-neutral-300 bg-neutral-600 px-2 py-2 hover:bg-neutral-700 hover:text-neutral-400 active:bg-neutral-600"
              onClick={passwordCopied}
            >
              Copy
            </button>
          </div>
          <div
            className="flex text-sm gap-x-2 text-neutral-600"
          >
            <div
              className="flex items-center gap-x-1"
            >
              <input
                type="range"
                min={6}
                max={21}
                value={length}
                className="cursor-pointer"
                style={{ accentColor: "gray" }}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isNumber}
                id="numberInput"
                style={{ accentColor: "gray" }}
                onChange={() => {
                  return setNumber(prevValue => !prevValue)
                }}
              />

              <label htmlFor="numberInput">Number</label>

            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isCharacter}
                id="characterInput"
                style={{ accentColor: "gray" }}
                onChange={() => {
                  return setCharacter(prevValue => !prevValue)
                }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
