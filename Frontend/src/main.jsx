import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

//components
import RainbowLine from './components/RainbowLine.jsx';
import DarkVeil from './components/reactbits/DarkVeil.jsx';

//CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppWrapper() {
  // const darkVeilRef = useRef();

  return (
    <StrictMode>
      <RainbowLine />
      {/* <App darkVeilRef={darkVeilRef} /> */}
      <App />
      {/* https://www.reactbits.dev/backgrounds/dark-veil */}
      <DarkVeil
        // ref={darkVeilRef}
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
