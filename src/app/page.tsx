"use client";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Key, Terminal, Code2, Play } from "lucide-react";

export default function HomePage() {
  const [apiKey, setApiKey] = useState("");
  const [postBody, setPostBody] = useState('{\n  "postBody": "production"\n}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Awtomatikong sasaluhin ang key mula sa URL query parameter (?key=sk_live...)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get("key");
    if (keyFromUrl) {
      setApiKey(keyFromUrl);
    }
  }, []);

  const testGetPing = async () => {
    if (!apiKey) return alert("Mangyaring maglagay ng API Key!");
    setLoading(true);
    setResponse({ message: "Connecting to API Server (localhost:3000)..." });

    try {
      const res = await fetch("http://localhost:3000/api/ping", {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Hindi makakonekta sa server. Siguraduhing buhay ang Port 3000." });
    } finally {
      setLoading(false);
    }
  };

  const testPostEcho = async () => {
    if (!apiKey) return alert("Mangyaring maglagay ng API Key!");
    setLoading(true);
    setResponse({ message: "Sending payload to API Server (localhost:3000)..." });

    try {
      const res = await fetch("http://localhost:3000/api/echo", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: postBody,
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Hindi makakonekta sa server. Siguraduhing buhay ang Port 3000." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030014] text-zinc-200 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      {/* Background Tech Network Effects katulad ng sa Dashboard mo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,16,48,0.3),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[linear-gradient(to_bottom,rgba(2,0,36,0),rgba(9,9,121,0.05),rgba(0,212,255,0.03))] opacity-50" />

      {/* Top Navbar Header */}
      <div className="w-full bg-[#030014]/60 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-sm tracking-wider text-cyan-400 uppercase font-bold">
              sir-dave // client-app
            </span>
          </div>
          <button 
            onClick={() => window.location.href = "http://localhost:3000"}
            className="text-xs font-medium px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg transition shadow-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 relative z-10 space-y-8">
        
        {/* Header Title section */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Code2 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              API Guide & Interactive Tester
            </h1>
            <p className="text-zinc-400 text-sm">
              Gamitin ang interface na ito upang mag-request sa secure endpoints ng Website 1 Server.
            </p>
          </div>
        </div>

        {/* 1. Main Key Injector Card (Glassmorphism look) */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex items-center gap-2 mb-4">
            <Key size={18} className="text-cyan-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Authentication Token</h2>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Please fill"
              className="w-full bg-[#05050f] border border-zinc-800 rounded-lg p-3.5 font-mono text-sm text-cyan-400 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition duration-200"
            />
            <p className="text-[11px] text-zinc-500">
              Ang token na ito ay ipapasa sa pamamagitan ng <span className="text-zinc-400 font-mono">x-api-key</span> header request structure.
            </p>
          </div>
        </div>

        {/* 2. Grid split for Controls and Terminal Window */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Controls Box (Left Side) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Trigger Operations</h3>
              
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={testGetPing}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-150 flex items-center justify-between shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                >
                  <span className="font-mono text-xs">GET /api/ping</span>
                  <Play size={14} fill="currentColor" />
                </button>

                <button
                  onClick={testPostEcho}
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-150 flex items-center justify-between shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                >
                  <span className="font-mono text-xs">POST /api/echo</span>
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Custom Post Body Area */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 space-y-2 shadow-xl">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">POST Payload Body</label>
              <textarea
                rows={4}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="w-full bg-[#05050f] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          {/* Clean Response Console (Right Side) */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden h-full shadow-2xl flex flex-col min-h-[300px]">
              
              {/* Terminal Window Header Bar */}
              <div className="bg-zinc-900/70 border-b border-zinc-800/60 px-4 py-2.5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="text-xs font-mono text-zinc-400">Response_Output.json</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
              </div>

              {/* Terminal Content Screen */}
              <div className="p-4 font-mono text-xs overflow-auto flex-1 bg-[#020206] text-emerald-400/90 leading-relaxed">
                {response ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                ) : (
                  <span className="text-zinc-600">// Naghihintay ng request... Pindutin ang kahit anong trigger button sa kaliwa upang simulan ang transaction event logs.</span>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}