import { useEffect, useState } from 'react';
import { fetchAutomations } from '../services/api';
import { filterEntitiesByDomain, getEntitiesFromAutomation, getEntityType } from '../services/helpers';
import { useVirtual } from './useVirtual';

/**
 * Custom hook to manage automation combinations with virtual objects
 * @returns {Object} Object containing automationCombinations state
 */
export const useAutomationCombinations = () => {
  const [automationCombinations, setAutomationCombinations] = useState({});
  const { virtualObjects } = useVirtual();

  useEffect(() => {
    const processAutomations = async () => {
      try {
        const automations = await fetchAutomations();

        if (!automations) {
          console.warn('No automations received from API');
          return;
        }

        const newCombinations = {};

        Object.values(automations).forEach(automation => {
          const entities = getEntitiesFromAutomation(automation);

          if (!automation.id) {
            console.warn('Automation missing ID:', automation);
            return;
          }

          newCombinations[automation.id] = {};

          Object.values(entities).forEach(entity => {
            const domain = getEntityType(entity);
            const eligibleVirtualEntities = filterEntitiesByDomain(virtualObjects, domain);

            if (!entity) {
              console.warn('Invalid entity in automation:', automation.id);
              return;
            }

            newCombinations[automation.id][entity] = newCombinations[automation.id][entity]
              ? [...newCombinations[automation.id][entity], ...eligibleVirtualEntities]
              : [eligibleVirtualEntities];
          });
        });

        setAutomationCombinations(newCombinations);
      } catch (error) {
        console.error('Error processing automations:', error);
      }
    };

    processAutomations();
  }, [virtualObjects]);

  return { automationCombinations };
};
