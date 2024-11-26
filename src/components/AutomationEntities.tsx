import { extractCategorizedEntityIds } from '../services/helpers';
import { type EntityName } from '@hakit/core';
import { Column, Row, EntitiesCardRow, ButtonCard } from '@hakit/components';
import { useEntitiesByDomain } from '../Hooks/useEntitiesByDomain';
import { useState } from 'react';

const EntityMap = (entity_id: EntityName) => {
  const [active, setActive] = useState(entity_id);
  const { entities: domainEntities } = useEntitiesByDomain(entity_id);

  return (
    <>
      <EntitiesCardRow
        entity={active}
        renderState={entity => (
          <div>
            {entity.state} {entity.attributes.unit_of_measurement}
          </div>
        )}
      />
      {/* render dropdown */}
      <select
        onChange={e => {
          setActive(e.target.value);
        }}
      >
        {domainEntities.map(entity => (
          <option key={entity.entity_id} value={entity.entity_id}>
            {entity.attributes.friendly_name}
          </option>
        ))}
      </select>
    </>
  );
};

export const AutomationEntities = props => {
  const { automation, triggeredAutomation, entity } = props;
  const automationEntities = extractCategorizedEntityIds(automation);

  return (
    <ButtonCard entity={entity.entity_id} style={{ background: triggeredAutomation?.name == automation.alias ? 'green' : undefined }}>
      <div>
        {/* Trigger Entities */}
        {automationEntities['trigger entities'].length > 0 ? (
          <div>
            <Row>
              <h5>Entities at Trigger</h5>
            </Row>
            <Column>{automationEntities['trigger entities'].map(entity_id => EntityMap(entity_id))}</Column>
          </div>
        ) : null}

        {/* Condition Entities */}
        {automationEntities['condition entities'].length > 0 ? (
          <div>
            <Row>
              <h5>Entities at Condition</h5>
            </Row>
            <Column>{automationEntities['condition entities'].map(entity_id => EntityMap(entity_id))}</Column>
          </div>
        ) : null}

        {/* Action Entities */}
        {automationEntities['action entities'].length > 0 ? (
          <div>
            <Row>
              <h5>Entities at Action</h5>
            </Row>
            <Column>{automationEntities['action entities'].map(entity_id => EntityMap(entity_id))}</Column>
          </div>
        ) : null}
        <br />
      </div>
    </ButtonCard>
  );
};
