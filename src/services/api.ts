import axios from 'axios';

const BASE_URL = 'http://hammock.local:8123/api';
const VIRTUAL_SERVICE = '/virtual';

// Endpoint definitions
const ENDPOINTS = {
  ADD_VIRTUAL_DEVICE: `${BASE_URL}${VIRTUAL_SERVICE}/add`,
  AUTOMATION_ENTRY: `${BASE_URL}/config/automation/config/entry`,
  VALIDATE_AUTOMATION: `${BASE_URL}/config/core/check_config`,
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
