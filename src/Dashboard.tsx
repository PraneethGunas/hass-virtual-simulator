import { TimeCard, Column, Row } from '@hakit/components';
import { EntityName, useHass } from '@hakit/core';
import { VirtualLights } from './components/VirtualLights';
import { VirtualSensors } from './components/VirtualSensors';
import { AutomationManager } from './components/AutomationManager';
import { getEntityType } from './services/helpers';
import { AutomationEntityMap } from './models';

/**
 * Dashboard component displaying various Home Assistant controls and information
 */
export const Dashboard = () => {
  const { getAllEntities } = useHass();
  const entities = getAllEntities();
  const automationEntities: AutomationEntityMap = Object.values(entities).reduce((acc: AutomationEntityMap, entity) => {
    if (getEntityType(entity.entity_id as EntityName) === 'automation') {
      acc[entity.attributes.id] = entity;
    }
    return acc;
  }, {});
  console.log(automationEntities);

  return (
    <Column fullWidth>
      {/* Header Section */}
      <Row gap='4' alignItems='center' className='mb-6'>
        <TimeCard />
      </Row>

      {/* Automation Section */}

      <h2 className='text-xl font-semibold mb-4'>Automations</h2>
      <AutomationManager automationEntities={automationEntities} />

      {/* Virtual Devices Section */}
      <h2 className='text-xl font-semibold mb-4'>Virtual Devices</h2>
      <Column fullWidth>
        <VirtualLights />
        <VirtualSensors />
      </Column>
    </Column>
  );
};

export default Dashboard;
