import { StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

//components
import RainbowLine from './components/RainbowLine.jsx';

// not mine but i tried to fix is for this use case..
// there was an issue where it wasnt resizing after the search results were loaded/updated.
// theres still an issue now where if you zoom out and then reset the zoom
// the height would remain as if you were zoomed out.
import DarkVeil from './components/reactbits/DarkVeil.jsx';

//CSS
import './index.css';

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
        // this is a hard one, i like the noise but its dependant on the monitors refresh rate, so ill just leave it off
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
