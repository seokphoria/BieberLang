import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);

  async function runCode() {
    setOutput("Running...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput("Could not connect to BieberLang server.");
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col bg-linear-to-br from-pink-50 via-purple-50 to-yellow-50 text-slate-800">
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/70 bg-white/60 backdrop-blur">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-neutral-400">Bieber</span><span className="text-pink-500">Lang</span>
          </h1>
          <a
            onClick={() => setShowDictionary(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm hover:bg-slate-100 transition"
          >
            <span className="text-blue-400">Dictionary</span>
          </a>
          <a
            href="https://github.com/seokphoria/BieberLang.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm hover:bg-slate-100 transition"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="currentColor"
              className="text-slate-700 hover:text-black"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.2-3.08-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.8 1.2 1.83 1.2 3.08 0 4.42-2.69 5.39-5.25 5.67.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-3">
          Choose your Artist:
          <select className="rounded-xl border border-purple-200 bg-white px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-pink-300">
            <option>Justin Bieber</option>
            <option>More Coming Soon...</option>
          </select>

          <button
            onClick={runCode}
            className="rounded-xl bg-pink-500 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-pink-600 active:scale-95"
          >
            ▶ Run
          </button>
        </div>
      </header>

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col rounded-3xl border border-white bg-white/80 shadow-xl overflow-hidden">
          <div className="border-b border-purple-100 bg-purple-100/70 px-5 py-3">
            <h2 className="text-center">Input</h2>
          </div>

          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();

                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;

                const newValue =
                  code.substring(0, start) + "  " + code.substring(end);

                setCode(newValue);

                setTimeout(() => {
                  e.target.selectionStart = e.target.selectionEnd = start + 2;
                }, 0);
              }
            }}
            className="flex-1 w-full resize-none bg-white/70 p-5 font-mono text-sm outline-none"
          />
        </div>

        <div className="flex flex-col rounded-3xl border border-white bg-white/80 shadow-xl overflow-hidden">
          <div className="border-b border-pink-100 bg-pink-100/70 px-5 py-3">
            <h2 className="text-center">Output</h2>
          </div>

          <pre className="flex-1 overflow-auto whitespace-pre-wrap bg-slate-900 p-5 font-mono text-sm text-green-300 text-left">
            {output || "Your output will appear here after you press Run."}
          </pre>
        </div>
      </section>
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-lg rounded-3xl bg-white p-6 shadow-2xl flex flex-col gap-4">
            <h2 className="mb-3 text-2xl font-bold text-pink-500">
              How BieberLang Works
            </h2>

            <p className="mb-4 text-slate-700">
              BieberLang is a programming language inspired by Justin Bieber
              lyrics. You write BieberLang code in the input panel, then press Run to
              send it to the Python interpreter.
            </p>

            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Song: Baby<br />
              <span className="pl-4 block">Just shout "Hello World", and I'll be there<br /></span>
              I thought you'd always be mine, mine
            </div>

            <p className="mt-4 text-slate-700">
              The interpreter reads your code, executes it, captures the printed
              output, and displays the result in the output panel. This example outputs "Hello World".
            </p>

            <button
              onClick={() => setShowHowItWorks(false)}
              className="mt-6 w-full rounded-xl bg-pink-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-pink-600 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      {showDictionary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl flex flex-col gap-4 relative">
            <button
              onClick={() => setShowDictionary(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black text-lg"
            >
              ✕
            </button>
            <h2 className="mb-3 text-2xl font-bold text-pink-500">
              BieberLang Dictionary
            </h2>

            <p className="mb-4 text-slate-700">
              Here is a dictionary for some common BieberLang commands:
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Program Structure</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Song: Baby <br />
              ...<br />
              I thought you'd always be mine, mine
            </div>
            <p className="mb-4 text-slate-700">
              - Marks the start and end of your program <br/>
              - Everything in between is executed
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Methods (Functions)</strong>
            </p>
            <p className="mb-4 text-slate-700">
              Define a method:
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Track MyMethod <br />
              ...<br />
              End track
            </div>
            <p className="mb-4 text-slate-700">
              Call a method:
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Play MyMethod ~
            </div>
            <p className="mb-4 text-slate-700">
              - Equivalent to: def MyMethod()
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Variables (Assignment)</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Oh, woah, x is 5 ~
            </div>
            <p className="mb-4 text-slate-700">
              - Assigns a value to a variable <br/>
              - Equivalent to: x = 5
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Printing (Output)</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Just shout "Hello World", and I'll be there
            </div>
            <p className="mb-4 text-slate-700">
              - Prints the specified text to the output panel <br/>
              - Equivalent to: print("Hello World")
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Increment</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              And x was like, baby, baby, ohh
            </div>
            <p className="mb-4 text-slate-700">
              - Increases a variable by the number of times "baby" appears <br/>
              - Equivalent to: x += 2
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Decrement</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Im going down, down
            </div>
            <p className="mb-4 text-slate-700">
              - Decreases a variable by the number of times "down" appears <br/>
              - Equivalent to: x -= 2
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Loop (While-Style)</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              When i &lt; 10, I had my first love <br/>
              ... <br/>
              And now my heart is breaking, but I just keep on saying
            </div>
            <p className="mb-4 text-slate-700">
              - Repeats block while condition is true <br/>
              - Equivalent to: while i &lt; 10
            </p>

            <p className="mb-4 text-slate-700">
              <strong>If / Elif / Else</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Are we i == 0? <br/>
                ... <br/>
              Girl quit playin, we're i == 1, what are you sayin? <br/>
                ... <br/>
              Said, "Theres another," and looked right in my eyes <br/>
                ... <br/>
              My first love broke my heart for the first time
            </div>
            <p className="mb-4 text-slate-700">
              <table className="w-full overflow-hidden rounded-xl bg-purple-50 text-left">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-2">Lyric</th>
                    <th className="px-4 py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  <tr className="border-t">
                    <td className="px-4 py-2 font-mono">Are we ... ?</td>
                    <td className="px-4 py-2">if</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-mono">Girl quit playin, we're ...</td>
                    <td className="px-4 py-2">elif</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-mono">Said, "Theres another,"...</td>
                    <td className="px-4 py-2">else</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 font-mono">My first love broke my heart...</td>
                    <td className="px-4 py-2">end if</td>
                  </tr>
                </tbody>
              </table>
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Expressions</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              Oh, for you, I would've done a + b
            </div>
            <p className="mb-4 text-slate-700">
              - Evaluates a value or operation <br/>
              - Supports + - * / %
            </p>

            <p className="mb-4 text-slate-700">
              <strong>Booleans</strong>
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 font-mono text-sm text-slate-700">
              true <br/>
              false
            </div>
            <p className="mb-4 text-slate-700">
              - Represents truth values <br/>
              - Used in conditions and expressions
            </p>

          </div>
        </div>
      )}
    </main>
  );
}

export default App
