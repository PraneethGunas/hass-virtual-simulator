import { Group } from '@hakit/components';
import { useCallback, useEffect, useState } from 'react';
import { fetchAutomations } from '../services/api';
import { AutomationEntities } from './AutomationEntities';
import { useHomeAssistantWebSocket } from '../Hooks/useHomeAssistantWebSocket';
import { AutomationConfig, AutomationEntityMap, SocketMetadata } from '../models';

export const AutomationManager = ({ automationEntities }: { automationEntities: AutomationEntityMap }) => {
  const [automations, setAutomations] = useState<AutomationConfig[]>([]);
  const [triggeredAutomation, setTriggeredAutomation] = useState<SocketMetadata>();

  useEffect(() => {
    const getAutomations = async () => {
      try {
        const automationsFromHass = (await fetchAutomations()) as AutomationConfig[];
        setAutomations(automationsFromHass);
      } catch (error) {
        console.error('Error fetching automations:', error);
      }
    };

    getAutomations();
  }, []);

  const handleEvent = useCallback((eventType: string, entityId: string, data: any) => {
    if (eventType === 'automation_triggered') {
      setTriggeredAutomation(data);
      // Clear triggered automation after 5 seconds
      setTimeout(() => setTriggeredAutomation(undefined), 2000);
    }
  }, []);

  useHomeAssistantWebSocket(handleEvent);

  return (
    <Group title='Automation Manager' alignItems='stretch'>
      {automations.map(automation => (
        <AutomationEntities
          key={automation.id}
          automation={automation}
          triggeredAutomation={triggeredAutomation}
          entity={automationEntities[automation.id]}
        />
      ))}
    </Group>
  );
};
