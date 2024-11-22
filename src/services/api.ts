import axios from 'axios';

const BASE_URL = 'https://homeassistant.praneethg.xyz/api';
const VIRTUAL_SERVICE = '/virtual';

// Endpoint definitions
const ENDPOINTS = {
  ADD_VIRTUAL_DEVICE: `${BASE_URL}${VIRTUAL_SERVICE}/add`, // custom endpoint
  FETCH_AUTOMATIONS: `${BASE_URL}${VIRTUAL_SERVICE}/automations/config`, // custom endpoint
  AUTOMATION_ENTRY: `${BASE_URL}/config/automation/config/entry`,
  VALIDATE_AUTOMATION: `${BASE_URL}/config/core/check_config`,
  FETCH_STATES: `${BASE_URL}/states`,
};

// Reusable headers function
const getHeaders = () => ({
  Authorization: `Bearer ${import.meta.env.VITE_HA_TOKEN}`,
  'Content-Type': 'application/json',
});

// API Methods
export const addEntity = (config: any) =>
  axios.post(ENDPOINTS.ADD_VIRTUAL_DEVICE, config, {
    headers: getHeaders(),
  });

export const createAutomation = (automationConfig: any) =>
  axios.post(ENDPOINTS.AUTOMATION_ENTRY, automationConfig, {
    headers: getHeaders(),
  });

export const validateAutomation = () =>
  axios.post(ENDPOINTS.VALIDATE_AUTOMATION, null, {
    headers: getHeaders(),
  });

export const fetchAutomations = async () => {
  const response = await axios.get(ENDPOINTS.FETCH_AUTOMATIONS, {
    headers: getHeaders(),
  });

  return response.data;
};
