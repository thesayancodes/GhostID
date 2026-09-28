"use client";

import React from "react";
import { Layout } from "./components/Layout";
import { GhostIDIntent } from "./components/GhostIDIntent";

export function App() {
  return (
    <Layout>
      <div className="py-8">
        <GhostIDIntent />
      </div>
    </Layout>
  );
}

export default App;
