import { useCallback, useEffect, useState, useRef } from "react";

function App() {

    // useState() hook
    const [length, setLength] = useState(10);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    // useRef() hook
    const passwordRef = useRef(null);

    // useCallback() hook
    const passwordGenerator = useCallback(() => {
        let pw = ""; // password to generate
        let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let lowerCase = "abcdefghijklmnopqrstuvwxyz";
        let str = upperCase + lowerCase;

        if(numAllowed) str += "0123456789";
        if(charAllowed) str += "~!@#$%^&*/";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pw += str.charAt(char);            
        }

        setPassword(pw);
    }, [length, numAllowed, charAllowed, setPassword]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,20);
        window.navigator.clipboard.writeText(password);
    }, [password]);

    // useEffect() hook
    useEffect(() => {
        passwordGenerator();
    }, [length, numAllowed, charAllowed, passwordGenerator]);

    return (
        <>
            <div className="w-full max-w-lg mx-auto my-10 rounded-lg px-4 py-3 bg-sky-950 text-green-500">
                <h1 className="text-2xl text-center text-white my-3">Password Generator</h1>

                <div className="flex overflow-hidden rounded-lg mb-4">
                    <input
                     type="text"
                     value={password}
                     placeholder="password"
                     className="w-full px-4 py-1 outline-none"
                     readOnly
                     ref={passwordRef} 
                     />

                    <button 
                    onClick={copyPasswordToClipboard}
                    className="bg-pink-600 hover:bg-blue-500 text-white outline-none px-3 py-1">copy</button>
                </div>

                <div className="flex text-sm gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <input 
                        type="range"
                        min={8}
                        max={26}
                        value={length}
                        className="cursor-pointer"
                        onChange={(e) => {setLength(e.target.value)}}
                        />
                        <label >Length={length}</label>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <input 
                        type="checkbox" 
                        defaultChecked={numAllowed}
                        className="cursor-pointer"
                        onChange={() => {
                            setNumAllowed((v) => !v)
                        }}
                        />
                        <label>numbers</label>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <input 
                        type="checkbox"
                        defaultChecked={charAllowed}
                        className="cursor-pointer"
                        onChange={() => {
                            setCharAllowed((v) => !v)
                        }}
                        />
                        <label>characters</label>
                    </div>                                            
                </div>

            </div>
        </>
    )
}

export default App;
