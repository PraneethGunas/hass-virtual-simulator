import { useVirtual } from './useVirtual';
import { getEntityType } from '../services/helpers';
import { EntityName } from '@hakit/core';

export const useEntitiesByDomain = (entity_id: EntityName) => {
  const { virtualObjects } = useVirtual();
  const myDomain = getEntityType(entity_id);
  const entities = virtualObjects.filter(entity => {
    const domain = getEntityType(entity.entity_id as EntityName);
    return domain == myDomain;
  });
  return { entities };
};
