import { useHass } from '@hakit/core';
import { useMemo } from 'react';

export const useVirtual = () => {
  const { getAllEntities } = useHass();
  const entities = getAllEntities();

  const virtualObjects = useMemo(() => {
    const result = [];
    for (const key in entities) {
      if (entities[key].attributes.is_virtual) {
        result.push(entities[key]);
      }
    }
    return result;
  }, [entities]);

  return { virtualObjects };
};
