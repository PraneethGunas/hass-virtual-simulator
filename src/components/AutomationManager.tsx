import { Column, Group } from '@hakit/components';
import { useCallback, useEffect, useState } from 'react';
import { fetchAutomations } from '../services/api';
import { AutomationEntities } from './AutomationEntities';
import { useHomeAssistantWebSocket } from '../Hooks/useHomeAssistantWebSocket';

export const AutomationManager = () => {
  const [automations, setAutomations] = useState([]);

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
    }
  }, []);

  useHomeAssistantWebSocket(handleEvent);

  return (
    <Group title='Automation Manager'>
      <Column alignItems='flex-start'>
        {automations.map(automation => (
          <AutomationEntities automation={automation} key={automation.id} />
        ))}
      </Column>
    </Group>
  );
};
