export function App() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-400/90">
          React · TypeScript · Tailwind
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to build
        </h1>
        <p className="max-w-prose text-lg text-slate-400">
          Edit <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-200">src/App.tsx</code>{" "}
          and save to see changes. Deploy this app to Vercel with the default Vite preset.
        </p>
      </main>
    </div>
  );
}
