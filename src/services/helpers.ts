export const getEntitiesFromAutomation = automationConfig => {
  const entities = new Set();

  function extractEntities(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(item => extractEntities(item));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === 'entity_id' && typeof obj[key] === 'string') {
          entities.add(obj[key]);
        } else {
          extractEntities(obj[key]);
        }
      }
    }
  }

  extractEntities(automationConfig);
  return Array.from(entities);
};

export const getEntityType = entity => {
  const domain = entity.split('.')[0];
  return domain;
};

export const filterEntitiesByDomain = (entities, domain) => {
  return entities.filter(entity => {
    const isDomainMatch = entity.entity_id.startsWith(`${domain}.`);
    return isDomainMatch;
  });
};
