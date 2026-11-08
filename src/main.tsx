import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Bricolage Grotesque with its optical-size axis (display cuts for headlines, text cuts for reading),
// and DM Mono for frame numbers, edge print, durations and prices.
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/dm-mono/latin-400.css';
import '@fontsource/dm-mono/latin-500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
