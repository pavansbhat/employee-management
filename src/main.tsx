import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReactFlowProvider } from "@xyflow/react";

async function enableMocking() {
    if (import.meta.env.MODE !== 'development') {
        return;
    }

    const { worker } = await import('./mocks/browser');
    await worker.start();
}


enableMocking().then(() => {
        createRoot(document.getElementById('root')!).render(
            <StrictMode>
                <ReactFlowProvider>
                    <App />
                </ReactFlowProvider>
            </StrictMode>);
    }
);
