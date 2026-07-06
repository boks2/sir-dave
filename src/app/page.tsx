"use client";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { Key, Terminal, Code2, Play } from "lucide-react";

// DITO ANG PAGBABAGO: Dynamic URL base sa Environment Variable
// Kung naka-deploy sa Vercel, gagamitin nito ang NEXT_PUBLIC_API_URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://it351-api-key-iivp.vercel.app";

export default function HomePage() {
  const [apiKey, setApiKey] = useState("");
  const [postBody, setPostBody] = useState('{\n  "postBody": "production"\n}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    setResponse({ message: `Connecting to API Server (${API_BASE})...` });

    try {
      const res = await fetch(`${API_BASE}/api/ping`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Hindi makakonekta sa server. Siguraduhing tama ang API_URL sa Vercel Settings." });
    } finally {
      setLoading(false);
    }
  };

  const testPostEcho = async () => {
    if (!apiKey) return alert("Mangyaring maglagay ng API Key!");
    setLoading(true);
    setResponse({ message: `Sending payload to API Server (${API_BASE})...` });

    try {
      const res = await fetch(`${API_BASE}/api/echo`, {
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
      setResponse({ error: "Hindi makakonekta sa server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030014] text-zinc-200 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,16,48,0.3),transparent_70%)]" />
      <div className="w-full bg-[#030014]/60 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-sm tracking-wider text-cyan-400 uppercase font-bold">
              sir-dave // client-app
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 relative z-10 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
            <Code2 size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">API Guide & Interactive Tester</h1>
            <p className="text-zinc-400 text-sm">Gamitin ang interface na ito upang mag-request sa secure endpoints ng API server.</p>
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Key size={18} className="text-cyan-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">Authentication Token</h2>
          </div>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Ilagay ang API Key dito..."
            className="w-full bg-[#05050f] border border-zinc-800 rounded-lg p-3.5 font-mono text-sm text-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Trigger Operations</h3>
              <div className="flex flex-col gap-2.5">
                <button onClick={testGetPing} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all flex items-center justify-between">
                  <span className="font-mono text-xs">GET /api/ping</span>
                  <Play size={14} fill="currentColor" />
                </button>
                <button onClick={testPostEcho} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-sm transition-all flex items-center justify-between">
                  <span className="font-mono text-xs">POST /api/echo</span>
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden h-full shadow-2xl flex flex-col min-h-[300px]">
              <div className="bg-zinc-900/70 border-b border-zinc-800/60 px-4 py-2.5 flex items-center">
                <Terminal size={14} className="text-emerald-400 mr-2" />
                <span className="text-xs font-mono text-zinc-400">Response_Output.json</span>
              </div>
              <div className="p-4 font-mono text-xs overflow-auto flex-1 bg-[#020206] text-emerald-400/90 leading-relaxed">
                {response ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                ) : (
                  <span className="text-zinc-600">// Naghihintay ng request...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}