import { extractCategorizedEntityIds } from '../services/helpers';
import { type EntityName } from '@hakit/core';
import { Column, Row, EntitiesCardRow } from '@hakit/components';

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

export const AutomationEntities = props => {
  const { automation, triggeredAutomation } = props;
  const entities = extractCategorizedEntityIds(automation);

  return (
    <div key={automation.id}>
      <h2 style={{ color: triggeredAutomation?.name == automation.alias ? 'green' : 'white' }}>{automation.alias}</h2>
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
};
