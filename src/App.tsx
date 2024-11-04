import { ThemeProvider } from '@hakit/components';
import { HassConnect } from '@hakit/core';
import Home from './Home';

function App() {
  return (
    <>
      <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
        <ThemeProvider />
        <Home />
      </HassConnect>
    </>
  );
}

export default App;
