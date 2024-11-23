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

/**
 * Extracts entity_ids from an automation configuration, categorized by type
 * @param {Object} automation - The automation configuration object
 * @returns {Object} Object with categorized arrays of entity_ids
 */
export const extractCategorizedEntityIds = automation => {
  if (!automation || typeof automation !== 'object') {
    throw new Error('Invalid automation configuration');
  }

  const result = {
    'trigger entities': [],
    'condition entities': [],
    'action entities': [],
  };

  // Extract from triggers
  if (Array.isArray(automation.triggers)) {
    automation.triggers.forEach(trigger => {
      if (trigger.entity_id) {
        // Handle both single string and array of entity_ids
        const triggerIds = Array.isArray(trigger.entity_id) ? trigger.entity_id : [trigger.entity_id];
        result['trigger entities'].push(...triggerIds);
      }
    });
  }

  // Extract from conditions
  if (Array.isArray(automation.conditions)) {
    automation.conditions.forEach(condition => {
      if (condition.entity_id) {
        // Handle both single string and array of entity_ids
        const conditionIds = Array.isArray(condition.entity_id) ? condition.entity_id : [condition.entity_id];
        result['condition entities'].push(...conditionIds);
      }
    });
  }

  // Extract from actions
  if (Array.isArray(automation.actions)) {
    automation.actions.forEach(action => {
      // Check for entity_id in target
      if (action.target?.entity_id) {
        const targetIds = Array.isArray(action.target.entity_id) ? action.target.entity_id : [action.target.entity_id];
        result['action entities'].push(...targetIds);
      }

      // Check for direct entity_id
      if (action.entity_id) {
        const actionIds = Array.isArray(action.entity_id) ? action.entity_id : [action.entity_id];
        result['action entities'].push(...actionIds);
      }
    });
  }

  return result;
};
