import { Group } from '@hakit/components';
import { useCallback, useEffect, useState } from 'react';
import { fetchAutomations } from '../services/api';
import { AutomationEntities } from './AutomationEntities';
import { useHomeAssistantWebSocket } from '../Hooks/useHomeAssistantWebSocket';

export const AutomationManager = ({ automationEntities }) => {
  const [automations, setAutomations] = useState([]);
  const [triggeredAutomation, setTriggeredAutomation] = useState();

  useEffect(() => {
    const getAutomations = async () => {
      try {
        const automationsFromHass = await fetchAutomations();
        setAutomations(automationsFromHass);
      } catch (error) {
        console.error('Error fetching automations:', error);
      }
    };

    getAutomations();
  }, []);

  const handleEvent = useCallback((eventType: string, entityId: string, data: any) => {
    if (eventType === 'automation_triggered') {
      console.log('Automation triggered:', entityId, data);
      setTriggeredAutomation(data);
      // Clear triggered automation after 5 seconds
      setTimeout(() => setTriggeredAutomation(undefined), 2000);
    }
  }, []);

  useHomeAssistantWebSocket(handleEvent);
  console.log(automations[0]);

  return (
    <Group title='Automation Manager' alignItems='stretch'>
      {automations.map(automation => (
        <AutomationEntities
          automation={automation}
          key={automation.id}
          triggeredAutomation={triggeredAutomation}
          entity={automationEntities[automation.id]}
        />
      ))}
    </Group>
  );
};
