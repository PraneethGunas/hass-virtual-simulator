import { deepEqual, extractCategorizedEntityIds, replaceObjectPath } from '../services/helpers';
import { Column, Row, EntitiesCardRow, ButtonCard } from '@hakit/components';
import { useEntitiesByDomain } from '../Hooks/useEntitiesByDomain';
import { useState } from 'react';
import { AutomationDiff } from './AutomationDiff';
import { HassEntity } from 'home-assistant-js-websocket';
import { AutomationConfig, SocketMetadata } from '../models';
import { EntityName } from '@hakit/core';

const EntityMap = (item, updateAutomation) => {
  const [active, setActive] = useState(item.entity_id);
  const { entities: domainEntities } = useEntitiesByDomain(item.entity_id);

  return (
    <>
      <EntitiesCardRow
        key={item.entity_id}
        entity={active}
        renderState={(entity: HassEntity) => (
          <div>
            {entity.state} {entity.attributes.unit_of_measurement}
          </div>
        )}
      />

      {domainEntities.length > 1 ? (
        <select
          onClick={e => {
            e.stopPropagation();
          }}
          value={active}
          onChange={e => {
            setActive(e.target.value);
            updateAutomation(item, e.target.value);
          }}
        >
          {domainEntities.map(entity => (
            <option key={entity.entity_id} value={entity.entity_id}>
              {entity.attributes.friendly_name}
            </option>
          ))}
        </select>
      ) : null}
    </>
  );
};

export const AutomationEntities = props => {
  const { automation, triggeredAutomation, entity, entity_id } = props as {
    automation: AutomationConfig;
    triggeredAutomation: SocketMetadata;
    entity: HassEntity;
    entity_id: EntityName;
  };
  const automationEntities = extractCategorizedEntityIds(automation);
  const [showScript, setShowScript] = useState(false);
  const [modifiedAutomation, setModifiedAutomation] = useState(automation);
  const toggleScript = () => {
    setShowScript(!showScript);
  };

  const onClose = () => {
    setShowScript(false);
  };

  const updateAutomation = (item, newEntity) => {
    const updatedAutomation = replaceObjectPath(automation, [...item.path], newEntity);
    setModifiedAutomation(updatedAutomation);
  };

  const isModified = !deepEqual(automation, modifiedAutomation);

  return (
    <>
      <ButtonCard
        entity={entity_id}
        style={{ background: triggeredAutomation?.entity_id == entity_id ? 'green' : undefined }}
        onDoubleClick={toggleScript}
        service={'toggle'}
      >
        <div>
          {/* Trigger Entities */}
          {automationEntities['trigger entities'].length > 0 ? (
            <div>
              <Row>
                <h5>Entities at Trigger</h5>
              </Row>
              <Column>{automationEntities['trigger entities'].map(item => EntityMap(item, updateAutomation))}</Column>
            </div>
          ) : null}

          {/* Condition Entities */}
          {automationEntities['condition entities'].length > 0 ? (
            <div>
              <Row>
                <h5>Entities at Condition</h5>
              </Row>
              <Column>{automationEntities['condition entities'].map(item => EntityMap(item, updateAutomation))}</Column>
            </div>
          ) : null}

          {/* Action Entities */}
          {automationEntities['action entities'].length > 0 ? (
            <div>
              <Row>
                <h5>Entities at Action</h5>
              </Row>
              <Column>{automationEntities['action entities'].map(item => EntityMap(item, updateAutomation))}</Column>
            </div>
          ) : null}
          <br />
        </div>
      </ButtonCard>
      {showScript ? (
        <AutomationDiff automation={automation} isModified={isModified} modifiedAutomation={modifiedAutomation} onClose={onClose} />
      ) : null}
    </>
  );
};
