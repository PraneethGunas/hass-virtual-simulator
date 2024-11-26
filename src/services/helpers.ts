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
 * Extracts entity_ids from an automation configuration, categorized by type, including nested structures
 * @param {Object} automation - The automation configuration object
 * @returns {Object} Object with categorized arrays of entity_ids along with their paths
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

  /**
   * Recursively extracts entity_ids from a given object or array
   * @param {Object|Array} data - The object or array to search
   * @param {Array} path - The current path of keys leading to the data
   * @param {string} category - The category (trigger, condition, action)
   */
  const extractEntityIds = (data, path, category) => {
    if (Array.isArray(data)) {
      // Iterate over each element in the array
      data.forEach((item, index) => {
        extractEntityIds(item, [...path, index], category);
      });
    } else if (typeof data === 'object' && data !== null) {
      // Iterate over keys in the object
      Object.keys(data).forEach(key => {
        if (key === 'entity_id') {
          const entityIds = Array.isArray(data[key]) ? data[key] : [data[key]];
          entityIds.forEach((entityId, idx) => {
            result[category].push({ entity_id: entityId, path: [...path, key, idx] });
          });
        } else {
          extractEntityIds(data[key], [...path, key], category);
        }
      });
    }
  };

  // Extract entity_ids from triggers, conditions, and actions
  if (automation.triggers) {
    extractEntityIds(automation.triggers, ['triggers'], 'trigger entities');
  }
  if (automation.conditions) {
    extractEntityIds(automation.conditions, ['conditions'], 'condition entities');
  }
  if (automation.actions) {
    extractEntityIds(automation.actions, ['actions'], 'action entities');
  }

  return result;
};

/**
 * Safely converts a string to snake_case format without using regex
 * @param {string} str - The input string to convert
 * @returns {string} The converted snake_case string
 */
export const toSnakeCase = str => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const result = [];
  let wasSpace = false;

  // Process each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();

    // Check if it's a letter or number
    if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
      result.push(char);
      wasSpace = false;
    }
    // Handle spaces and special characters
    else {
      // Only add underscore if previous character wasn't a space
      if (!wasSpace && result.length > 0) {
        result.push('_');
      }
      wasSpace = true;
    }
  }

  // Remove trailing underscore if exists
  if (result[result.length - 1] === '_') {
    result.pop();
  }

  return result.join('');
};

export const replaceObjectPath = (obj, path, newValue) => {
  // Create a deep clone of the original object
  const newObject = JSON.parse(JSON.stringify(obj));

  // Use a non-mutating approach to traverse and update the object
  const updateNestedObject = (target, pathArray, value) => {
    // Create a copy of the path to avoid mutation
    const currentPath = [...pathArray];

    // If we're at the last key, update the value
    if (currentPath.length === 1) {
      target[currentPath[0]] = value;
      return;
    }

    // Recursively traverse the object
    const currentKey = currentPath.shift();
    updateNestedObject(target[currentKey], currentPath, value);
  };

  // Update the cloned object
  updateNestedObject(newObject, path, newValue);

  return newObject;
};
