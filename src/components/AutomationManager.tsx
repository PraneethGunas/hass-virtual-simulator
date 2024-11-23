import { Column, Group, Row, EntitiesCardRow } from '@hakit/components';
import { useEffect, useState } from 'react';
import { fetchAutomations } from '../services/api';
import { extractCategorizedEntityIds } from '../services/helpers';
import type { EntityName } from '@hakit/core';

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

  const renderEntityRow = (entity_id: EntityName) => (
    <EntitiesCardRow
      key={entity_id}
      entity={entity_id}
      renderState={entity => (
        <div>
          {entity.state} {entity.attributes.unit_of_measurement}
        </div>
      )}
    />
  );

  return (
    <Group title='Automation Manager'>
      <Column alignItems='flex-start'>
        {automations.map(automation => {
          const entities = extractCategorizedEntityIds(automation);
          return (
            <div key={automation.id}>
              <h2>{automation.alias}</h2>
              {automation.description && <p>{automation.description}</p>}

              <div className='space-y-4'>
                {/* Trigger Entities */}
                {entities['trigger entities'].length > 0 ? (
                  <div>
                    <Row>
                      <h5>Entities at Trigger</h5>
                    </Row>
                    <Column>{entities['trigger entities'].map(renderEntityRow)}</Column>
                  </div>
                ) : null}

                {/* Condition Entities */}
                {entities['condition entities'].length > 0 ? (
                  <div>
                    <Row>
                      <h5>Entities at Condition</h5>
                    </Row>
                    <Column>{entities['condition entities'].map(renderEntityRow)}</Column>
                  </div>
                ) : null}

                {/* Action Entities */}
                {entities['action entities'].length > 0 ? (
                  <div>
                    <Row>
                      <h5>Entities at Action</h5>
                    </Row>
                    <Column>{entities['action entities'].map(renderEntityRow)}</Column>
                  </div>
                ) : null}
                <br />
              </div>
            </div>
          );
        })}
      </Column>
    </Group>
  );
};
