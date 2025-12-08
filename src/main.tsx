import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </StrictMode>,
  );
});
