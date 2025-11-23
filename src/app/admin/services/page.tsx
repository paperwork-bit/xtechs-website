"use client";

import * as React from "react";

export default function AdminServices() {
  const [data, setData] = React.useState<{ services: { title: string; image: string; overlayImage: string }[] } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  async function handleUpload(index: number, form: HTMLFormElement) {
    const fd = new FormData(form);
    fd.set("index", String(index));
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      await load();
      form.reset();
    } catch (e: any) {
      setError(e?.message ?? "Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Services Images</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <button onClick={load} className="mb-4 rounded bg-blue-600 text-white px-3 py-1 disabled:opacity-50" disabled={loading}>
        Refresh
      </button>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((s, i) => (
            <div key={i} className="border rounded p-4 bg-white dark:bg-slate-900">
              <h2 className="font-medium mb-2">{s.title}</h2>
              <div className="flex gap-4 mb-3">
                <div className="text-sm">
                  <div className="mb-1">Background:</div>
                  {s.image ? <img src={s.image} alt="bg" className="h-24 rounded" /> : <div className="h-24 w-32 bg-slate-200 rounded" />}
                </div>
                <div className="text-sm">
                  <div className="mb-1">Foreground:</div>
                  {s.overlayImage ? <img src={s.overlayImage} alt="fg" className="h-24 rounded" /> : <div className="h-24 w-32 bg-slate-200 rounded" />}
                </div>
              </div>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpload(i, e.currentTarget);
                }}
              >
                <input type="file" name="image" accept="image/*" />
                <input type="file" name="overlayImage" accept="image/*" />
                <button className="self-start rounded bg-green-600 text-white px-3 py-1 disabled:opacity-50" disabled={loading}>
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



