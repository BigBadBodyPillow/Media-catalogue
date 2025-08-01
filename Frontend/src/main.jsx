import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

//components
import RainbowLine from './components/RainbowLine.jsx';
import DarkVeil from './components/reactbits/DarkVeil.jsx';

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppWrapper() {
  return (
    <StrictMode>
      <RainbowLine />
      <App />
      {/* https://www.reactbits.dev/backgrounds/dark-veil */}
      <DarkVeil
        hueShift={245}
        // i like the noise but its dependant on the monitors refresh rate, so ill just leave it off
        noiseIntensity={0}
        scanlineIntensity={0.06}
        speed={0.5}
        scanlineFrequency={10}
        warpAmount={0}
      />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<AppWrapper />);
