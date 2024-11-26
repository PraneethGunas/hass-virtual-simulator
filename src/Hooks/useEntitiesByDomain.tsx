import { useVirtual } from './useVirtual';
import { getEntityType } from '../services/helpers';

export const useEntitiesByDomain = entity_id => {
  const { virtualObjects } = useVirtual();
  const myDomain = getEntityType(entity_id);
  const entities = virtualObjects.filter(entity => {
    const domain = getEntityType(entity.entity_id);
    return domain == myDomain;
  });
  return { entities };
};
