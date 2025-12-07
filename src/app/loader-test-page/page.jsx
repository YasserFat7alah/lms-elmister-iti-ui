"use client";

import LogoLoader from "@/components/shared/LogoLoader";
import { useState } from "react";

export default function LoaderTestPage() {
  const [show, setShow] = useState(true);
  const [variant, setVariant] = useState("pulse");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="mb-6 flex gap-3">
        <button onClick={() => { setVariant("pulse"); setShow(true); }} className="px-4 py-2 bg-white border rounded">Pulse</button>
        <button onClick={() => { setVariant("reveal"); setShow(true); }} className="px-4 py-2 bg-white border rounded">Reveal</button>
        <button onClick={() => setShow(false)} className="px-4 py-2 bg-white border rounded">Hide</button>
      </div>

      <div className="w-full max-w-xl p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Page content</h2>
        <p className="text-sm text-gray-600">Use the buttons above to preview the loader. The loader is fixed and centered, and blocks scroll while visible.</p>
      </div>

      {show && <LogoLoader variant={variant} background="bg-white" logoSrc="/assets/images/logo.png" />}
    </main>
  );
}
