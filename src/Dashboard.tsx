import { TimeCard } from '@hakit/components';
import { useHass } from '@hakit/core';
import { VirtualLights } from './components/VirtualLights';
import { VirtualSensors } from './components/VirtualSensors';
import { AutomationManager } from './components/AutomationManager';

function Dashboard() {
  const { getAllEntities } = useHass();
  const entities = getAllEntities();

  return (
    <>
      <TimeCard />
      <br />
      <AutomationManager />
      <VirtualLights />
      <br />
      <VirtualSensors />
      <p>
        You have <b>{Object.keys(entities).length}</b> entities to start automating with! Have fun!
      </p>
    </>
  );
}

export default Dashboard;
