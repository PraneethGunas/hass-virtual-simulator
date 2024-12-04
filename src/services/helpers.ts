import { EntityName } from '@hakit/core';
import { HassEntity } from 'home-assistant-js-websocket';
import { AutomationConfig } from '../models';

export const getEntitiesFromAutomation = (automationConfig: HassEntity) => {
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

export const getEntityType = (entity: EntityName) => {
  const domain = entity.split('.')[0];
  return domain;
};

export const filterEntitiesByDomain = (entities: HassEntity[], domain: string) => {
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
export const extractCategorizedEntityIds = (automation: AutomationConfig) => {
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
          if (Array.isArray(data[key])) {
            // Generate path with index for arrays
            entityIds.forEach((entityId, idx) => {
              result[category].push({ entity_id: entityId, path: [...path, key, idx] });
            });
          } else {
            // Generate path without index for strings
            result[category].push({ entity_id: data[key], path: [...path, key] });
          }
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
  // Create a deep clone of the original object to ensure immutability
  const newObject = JSON.parse(JSON.stringify(obj));

  // Traverse the cloned object to the target location
  let target = newObject;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    target = target[key];
  }

  // Assign the new value at the target path
  const lastKey = path[path.length - 1];
  target[lastKey] = newValue;

  return newObject;
};
export const deepEqual = (x, y) => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key])) : x === y;
};
